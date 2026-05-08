"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { api, getApiErrorMessage } from "../../lib/api";
import { CheckoutResponse, Tier } from "../../types";

const PLAN_DETAILS: Record<
  "pro" | "max",
  { name: string; price: string; perks: string[] }
> = {
  pro: {
    name: "Pro",
    price: "$9.99 / month",
    perks: ["Home", "About", "Premium content"],
  },
  max: {
    name: "Max",
    price: "$19.99 / month",
    perks: ["Home", "About", "Premium content", "Ultra Premium content"],
  },
};

function SubscribeContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const planParam = params.get("plan");
  const canceled = params.get("canceled") === "1";
  const plan: "pro" | "max" = planParam === "max" ? "max" : "pro";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=/subscribe?plan=${plan}`);
    }
  }, [loading, user, plan, router]);

  const details = useMemo(() => PLAN_DETAILS[plan], [plan]);

  const onSubscribe = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const { data } = await api.post<CheckoutResponse>(
        "/stripe/create-checkout-session",
        {
          plan,
        },
      );
      window.location.href = data.url;
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not start checkout"));
      setSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const currentTier: Tier = user.tier;
  const alreadyOnThisPlan = currentTier === plan;

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {canceled && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Checkout canceled. You can try again any time.
        </Alert>
      )}
      <Card sx={{ borderTop: 4, borderColor: "secondary.main" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Subscribe to {details.name}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            {details.price}
          </Typography>
          <Box component="ul" sx={{ pl: 2.5, color: "text.secondary", mb: 3 }}>
            {details.perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </Box>
          {alreadyOnThisPlan && (
            <Alert severity="success" sx={{ mb: 2 }}>
              You are already on the {details.name} plan.
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            disabled={submitting || alreadyOnThisPlan}
            onClick={onSubscribe}
          >
            {submitting ? "Redirecting…" : `Subscribe to ${details.name}`}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <SubscribeContent />
    </Suspense>
  );
}
