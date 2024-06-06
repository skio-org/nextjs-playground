'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import SkioPlanPicker from './skio-plan-picker';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const defaultVariantId = product.variants.length === 1 ? product.variants[0]?.id : undefined;
  const variant = product.variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const selectedVariantId = variant?.id || defaultVariantId;

  const [sellingPlanId, setSellingPlanId] = useState<string | undefined>(undefined);

  const onPlanChange = (planId: string) => {
    if(planId) {
      setSellingPlanId(`gid://shopify/SellingPlan/${planId}`);
    } else {
      setSellingPlanId(undefined);
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={product.options} variants={product.variants} />
      </Suspense>

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <Suspense fallback={null}>
      <SkioPlanPicker productHandle={product.handle} selectedVariantId={selectedVariantId} onPlanChange={onPlanChange}/>
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} sellingPlanId={sellingPlanId} />
      </Suspense>
    </>
  );
}
