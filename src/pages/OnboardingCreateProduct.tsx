import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Seo from "@/components/seo/Seo";
import { demoStorage } from "@/lib/demoStorage";

const schema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(2, "SKU is required"),
  price: z.coerce.number().nonnegative("Price must be positive"),
  description: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

const OnboardingCreateProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (demoStorage.hasProducts()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (values: FormValues) => {
    demoStorage.saveProduct({
      name: values.name,
      sku: values.sku,
      price: values.price,
      description: values.description,
    });
    toast({ title: "Demo product created", description: `${values.name} is ready in your dashboard.` });
    navigate("/", { replace: true });
  };
  return (
    <div className="max-w-2xl mx-auto">
      <Seo title="Create Your First Demo Product" description="Onboard quickly by creating a demo product to explore the dashboard features." canonical={window.location.href} />
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-heading">Create your first demo product</h1>
        <p className="text-muted-foreground">We’ll use this to populate your dashboard with realistic data.</p>
      </header>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Product details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Product name</label>
              <Input id="name" placeholder="Acme Pro Subscription" {...register("name")} aria-invalid={!!errors.name} />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium mb-1">SKU</label>
                <Input id="sku" placeholder="ACME-PRO" {...register("sku")} aria-invalid={!!errors.sku} />
                {errors.sku && <p className="text-sm text-destructive mt-1">{errors.sku.message}</p>}
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">Price</label>
                <Input id="price" type="number" step="0.01" placeholder="99" {...register("price")} aria-invalid={!!errors.price} />
                {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <Textarea id="description" placeholder="Premium plan with advanced analytics and priority support." {...register("description")} />
            </div>
            <div className="pt-2">
              <Button type="submit" className="hover-scale" disabled={isSubmitting} aria-label="Create demo product">
                {isSubmitting ? "Creating…" : "Create product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingCreateProduct;
