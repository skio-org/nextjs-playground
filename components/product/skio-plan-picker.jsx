import { createComponent } from '@lit/react';
import { LitElement, css, html } from 'lit';
import React from 'react';

/**
 * Skio Universal Plan Picker
 * @docs https://integrate.skio.com/
 *
 * Uses LitJS (<5kb) https://lit.dev/ for reactive web components
 */

class SkioPlanPicker extends LitElement {
  static properties = {
    key: { type: String },

    product: { type: Object },
    productHandle: { type: String },
    selectedVariant: { type: Object },
    selectedVariantId: { type: String },

    availableSellingPlanGroups: { state: true },
    selectedSellingPlanGroup: { type: Object },
    selectedSellingPlan: { type: Object },

    disableUrl: { type: Boolean },

    onPlanChange: { type: Function },
  }

  static styles = [
    css`
      :host {
        width: 100%;
        max-width: 440px;
      }

      .skio-plan-picker {
        display: flex;
        gap: 1rem;
        padding: 0;
        border: 0;
        font-size: 15px;
        color: white;
        width: 100%;
        margin-bottom: 1rem;
        font-family: inherit;
        flex-direction: column;
      }

      .sr-only {
        position: absolute;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
      }

      .group-container {
        display: block;
        position: relative;
        transition: border-color 0.2s ease;
        border: 1px solid #222;
        color: #fff;
      }

      .group-container--selected {
        border-color: #fff;
        color: #fff;
      }

      .group-container--last {
        order: 1;
      }

      .group-input {
        position: absolute;
        opacity: 0;
        width: 0px;
        height: 0px;
      }

      .group-input:focus-visible ~ .group-label {
        outline: 2px #ccc solid;
        outline-offset: 4px;
      }

      .group-label {
        display: flex;
        flex-direction: column;
        padding: 10px;
        cursor: pointer;
      }

      .group-topline {
        display: flex;
        align-items: center;
        width: 100%;

        gap: 8px;
      }

      .skio-radio__container {
        display: flex;
        color: #fff;
      }

      .group-container--selected .skio-radio__container {
        color:#fff;
      }

      .skio-radio {
        transform-origin: center;
        opacity: 0;
        transform: scale(0);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .group-label:hover .skio-radio {
        opacity: 0.75;
        transform: scale(1);
      }

      .group-container--selected .group-label .skio-radio {
        opacity: 1;
        transform: scale(1);
      }

      .skio-price {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        align-items: center;
        text-align: right;
        gap: 4px;

        line-height: 1;

        margin-left: auto;
        vertical-align: middle;

        font-weight: 500;
      }

      .skio-price s {
        font-size: 13px;

        font-weight: 400;
        opacity: 0.75;
      }

      .group-content {
        display: flex;
        flex-direction: column;
        opacity: 1;
        width: auto;
        max-height: 1000px;
        transition:
          max-height 0.15s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .group-content.margin-left {
        margin-left: 25px;
      }

      .group-content p {
        margin: 0.5rem 0 0 0;
        font-size: 13px;
        color: #fff;
      }

      /* Hide frequency if not selected */
      .group-container:not(.group-container--selected) .group-content {
        pointer-events: none;
        opacity: 0;
        max-height: 0;
        visibility: hidden;
      }

      .group-title {
        width: 100%;
        max-width: 80%;
        line-height: 1.5;
      }

      .savings {
        color: var(--skio-discount-text-color, #fff);
      }

      .savings.bubble {
        padding: 0px 8px;
        background-color: #0fa573;
        border: 1px #0fa573 solid;
        border-radius: 4px;
        font-size: 12px;
        color: var(--skio-discount-text-color, #fff);

        white-space: nowrap;
      }

      .selling-plan-dropdown {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        display: flex;
        align-items: center;
        gap: 5px;
        width: 100%;
        margin-top: 5px;
        padding: 8px 30px 8px 10px;
        color: white;
        background-color: #000;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='#ffffff' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px top 50%;
        background-size: 16px;
        border: 1px solid #ccc;
        border-radius: 2px;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .selling-plan-dropdown--one {
        background-image: none;
        pointer-events: none;
        background: transparent;
      }

      .selling-plan-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--skio-button-plan-selector-width, 20px), 1fr));
        gap: 10px;
        padding: 0.75rem 0;
        border: 0;
        font-size: 13px;
      }

      .selling-plan-buttons input[type='radio'] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      .selling-plan-buttons label {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid #ccc;
        text-align: center;
        padding: 1rem 0.5rem;
      }

      .selling-plan-buttons input[type='radio']:checked + label {
        border-color: #000;
      }

      .selling-plan-buttons input:focus-visible + label {
        outline: 2px #ccc solid;
        outline-offset: 4px;
      }
    `,
  ]

  constructor() {
    super()

    this.currency = window?.Shopify?.currency?.active || 'USD'
    this.language = window?.Shopify?.locale || 'en-US'
    this.moneyFormatter = new Intl.NumberFormat(this.language, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    // Start - Debug Variables
    this.debug = window?.Shopify?.designMode
    this.variantChanged = false
    // End - Debug Variables

    this.rules = []
    this.rule = null
    this.quantity = 1
    this.showDetailsHover = false

    this.options = {
      layout: 'vertical',
      show_legend: true,
      show_radio_selector: true,
      onetime_first: true,
      show_without_subscription: false,
      selector_type: 'dropdown',
      show_compare_price: true,
    }

    this.productHandle = null;
    this.selectedVariantId = null;

    this.onPlanChange = (planId) => {}
  }

  async connectedCallback() {
    super.connectedCallback()

    this.log('Mounted')

    if (this.productHandle) {
      this.loading = true
      this.fetchProduct(this.productHandle)
    }
  }

  // SECTION: Element Templates
  radioTemplate() {
    return html`
      <div class="skio-radio__container">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1"></circle>
          <circle class="skio-radio" cx="12" cy="12" r="7" fill="currentColor"></circle>
        </svg>
      </div>
    `
  }

  sellingPlanDropdown(group) {
    return html`
      <select
        class="selling-plan-dropdown ${this.getAvailableSellingPlans(group).length == 1 ? 'selling-plan-dropdown--one' : ''}"
        @change=${e => {
          this.selectSellingPlan(e.target.value)
        }}
      >
        ${group
          ? this.getAvailableSellingPlans(group).map(
              selling_plan => html` <option ?selected=${group.selected_selling_plan.id === selling_plan.id} value=${selling_plan.id}>${selling_plan.name}</option> `
            )
          : ''}
      </select>
    `
  }

  groupContent(group) {
    return html`
      <div class="group-content">
        ${this.sellingPlanDropdown(group)}
      </div>
    `
  }

  // !SECTION: Element Templates

  render() {
    if(!this.product || !this.selectedVariant) {
      return;
    }

    if (this.selectedVariant.selling_plan_allocations.length === 0 && !this.options?.show_without_subscription) {
      return;
    }

    return html`
      <fieldset class="skio-plan-picker" role="radiogroup" aria-labelledby="skio-plan-picker-legend">
        ${!this.product.requires_selling_plan
          ? html`
              <div
                class="group-container ${this.selectedSellingPlanGroup == null ? 'group-container--selected' : ''} ${!this.options?.onetime_first ? 'group-container--last' : ''}"
                @click=${() => this.selectSellingPlanGroup(null)}
              >
                <input
                  id="one-time-${this.key}"
                  class="group-input"
                  name="skio-group-${this.key}"
                  type="radio"
                  value="One time purchase"
                  ?checked=${!this.selectedSellingPlanGroup}
                  @change=${() => this.selectSellingPlanGroup(null)}
                />

                <label class="group-label" for="one-time-${this.key}">
                  <div class="group-topline">
                    ${this.radioTemplate()}

                    <div class="group-title">One time purchase</div>

                    <div class="skio-price" aria-live="polite">
                      ${this.options?.show_compare_price && this.selectedVariant?.compare_at_price > this.selectedVariant.price
                        ? html`<s aria-hidden="true">${this.money(this.selectedVariant.compare_at_price)}</s>`
                        : ''}
                      ${this.money(this.selectedVariant.price)}
                    </div>
                  </div>
                </label>
              </div>
            `
          : ''}
        ${this.availableSellingPlanGroups?.length
          ? this.availableSellingPlanGroups.map(
              (group, index) => html`
                <div class="group-container ${this.selectedSellingPlanGroup == group ? 'group-container--selected' : ''}">
                  <input
                    id="group-${index}-${this.key}"
                    class="group-input"
                    name="skio-group-${this.key}"
                    type="radio"
                    value="${group.id}"
                    @change=${() => this.selectSellingPlanGroup(group)}
                    ?checked=${this.selectedSellingPlanGroup == group}
                  />

                  <label class="group-label" for="group-${index}-${this.key}">
                    <div class="group-topline">
                      ${this.radioTemplate()}

                      <div class="group-title">
                        ${group.name !== 'Prepaid' && this.options?.subscription_title
                          ? this.options?.subscription_title
                          : group.name == 'Prepaid' && this.options?.prepaid_title
                            ? this.options?.prepaid_title
                            : group.name}
                        ${this.discountText(group.selected_selling_plan)
                          ? html` <span class="savings bubble"> ${this.discountText(group.selected_selling_plan)} </span> `
                          : html``}
                      </div>

                      <div class="skio-price" aria-live="polite">
                        ${this.options?.show_compare_price &&
                        (this.selectedVariant?.compare_at_price > this.selectedVariant.price || this.selectedVariant.price > this.price(group.selected_selling_plan, false))
                          ? html`<s aria-hidden="true">${this.money(this.selectedVariant.compare_at_price ? this.selectedVariant.compare_at_price : this.selectedVariant.price)}</s>`
                          : ''}
                        ${this.price(group.selected_selling_plan)}
                      </div>
                    </div>

                    ${this.groupContent(group)}
                  </label>
                </div>
              `
            )
          : ''}
      </fieldset>
    `
  }

  updated(changed) {
    if (changed.has('product') && this.product) {
      this.key = this.key ? this.key : this.product.id
    }

    if(changed.has('selectedVariantId') && this.selectedVariantId) {
      const variantId = this.selectedVariantId.replace('gid://shopify/ProductVariant/', '')
      this.selectedVariant = this.product?.variants.find(variant => variant.id == variantId)
    }

    if (changed.has('selectedVariant') && this.selectedVariant) {
      const filteredSellingPlanGroups = this.product.selling_plan_groups.filter(
        selling_plan_group =>
          selling_plan_group.app_id === 'SKIO' && !selling_plan_group.name.toLowerCase().includes('hidden-') && !selling_plan_group.name.toLowerCase().includes('dynamic box subscription')
      )

      //update availableSellingPlanGroups based on skioSellingPlanGroups and selectedVariant.id
      this.availableSellingPlanGroups = filteredSellingPlanGroups.filter(selling_plan_group =>
        selling_plan_group.selling_plans.some(selling_plan =>
          this.selectedVariant.selling_plan_allocations.some(selling_plan_allocation => selling_plan_allocation.selling_plan_id === selling_plan.id)
        )
      )

      if (this.options?.combine_groups) {
        this.availableSellingPlanGroups = [
          {
            name: this.options?.combined_group_name,
            selling_plans: this.availableSellingPlanGroups.flatMap(group => group.selling_plans),
            id: 'combined_group',
            app_id: 'SKIO',
          },
        ]
      }

      // TODO: Select proper group depending on what selling plan is selected

      //update selectedSellingPlan value
      if (this.availableSellingPlanGroups?.length) {
        const url = new URL(window.location.href)
        const urlSelectedSellingPlanId = url.searchParams.get('selling_plan')

        //update each group with a default selected_selling_plan
        this.availableSellingPlanGroups.forEach(group => {
          const availableSellingPlans = this.getAvailableSellingPlans(group)

          const urlSelectedSellingPlan = availableSellingPlans.find(plan => plan.id == urlSelectedSellingPlanId)
          const nameSelectedSellingPlan = availableSellingPlans.find(plan => plan.name === this.selectedSellingPlan?.name)
          const defaultSellingPlan =
            this.options?.default_subscription && this.options.default_subscription.trim() !== ''
              ? availableSellingPlans.find(plan => plan.name.toLowerCase().includes(this.options.default_subscription.toLowerCase()))
              : null

          group.selected_selling_plan = urlSelectedSellingPlan || nameSelectedSellingPlan || defaultSellingPlan || availableSellingPlans[0]

          const isAnyPlanSelected = urlSelectedSellingPlan || nameSelectedSellingPlan || defaultSellingPlan

          group.selected = !!isAnyPlanSelected
        })

        if ((!this.variantChanged && this.options?.start_onetime == false) || this.product.requires_selling_plan == true || urlSelectedSellingPlanId || this.selectedSellingPlan) {
          const selectedSellingPlanGroup = this.availableSellingPlanGroups.find(group => group.selected) || this.availableSellingPlanGroups[0]
          const selectedSellingPlanId = selectedSellingPlanGroup.selected_selling_plan.id
          this.selectSellingPlan(selectedSellingPlanId)
        } else {
          this.selectSellingPlanGroup(null)
        }
      } else {
        this.selectSellingPlanGroup(null)
      }
    }

    if (changed.has('selectedSellingPlan') && this.onPlanChange) {
      this.onPlanChange(this.selectedSellingPlan?.id)
    }
  }

  // SECTION: Utility Functions
  log(...args) {
    args.unshift(`%c[skio plan picker][${this.key}]`, 'color: #8770f2;')
    console.log.apply(console, args)
  }

  error(...args) {
    args.unshift(`%c [skio plan picker][${this.key}]`, 'color: #ff0000')
    console.error.apply(console, args)
  }

  money(price) {
    return this.moneyFormatter.format(price / 100.0)
  }

  getAvailableSellingPlans(group) {
    const availableSellingPlans = group.selling_plans.filter(selling_plan =>
      this.selectedVariant.selling_plan_allocations.some(selling_plan_allocation => selling_plan_allocation.selling_plan_id === selling_plan.id)
    )

    return availableSellingPlans
  }

  // !SECTION: Utility Functions

  // Update selected selling plan group; called on click of group-container element
  selectSellingPlanGroup(group) {
    this.selectedSellingPlanGroup = group
    this.selectedSellingPlan = group?.selected_selling_plan
  }

  // Update selected selling plan; called on change of skio-frequency select element
  selectSellingPlan(selling_plan_id) {
    const selectedGroup = this.availableSellingPlanGroups.find(group => group.selling_plans.some(plan => plan.id == selling_plan_id))
    const selectedSellingPlan = selectedGroup.selling_plans.find(plan => plan.id == selling_plan_id)

    selectedGroup.selected_selling_plan = selectedSellingPlan
    this.selectedSellingPlanGroup = selectedGroup
    this.selectedSellingPlan = selectedSellingPlan
  }

  // SECTION: Discount Functions
  // Calculates discount based on selling_plan.price_adjustments, returns { percent, amount } of selling plan discount
  discountText(selling_plan) {
    const discount = this.discount(selling_plan)

    return `Save ${discount.percent}%`
  }

  discount(selling_plan) {
    if (!selling_plan) return { percent: 0, amount: 0 }
    return this.getDiscountFromPriceAdjustment(selling_plan, selling_plan.price_adjustments[0])
  }

  getDiscountFromPriceAdjustment(selling_plan, price_adjustment) {
    const discount = {
      percent: 0,
      amount: 0,
      absolute: 0,
    }

    let multiplier = 1

    const sellingPlanGroup = this.product.selling_plan_groups.find(group => group.selling_plans.some(plan => plan.id == selling_plan.id))

    if (sellingPlanGroup?.name === 'Prepaid') {
      const str = selling_plan.name // replace with your string
      const intervalDate = /\b\d+\s*(days|weeks|months|years)\b/gi
      const intervalDateMatches = str.match(intervalDate)

      if (intervalDateMatches?.length) {
        const intervals = intervalDateMatches[0].match(/\d+/g)
        multiplier = intervals[0] / (intervals[1] || 1)
        multiplier = multiplier > 1 ? multiplier : 1
      }
    }

    const price = this.selectedVariant.price
    const compareAtPrice = this.selectedVariant.compare_at_price && this.selectedVariant.compare_at_price > price ? this.selectedVariant.compare_at_price : price

    switch (price_adjustment.value_type) {
      case 'percentage':
        discount.percent = price_adjustment.value
        discount.absolute = Math.round((price * price_adjustment.value) / 100.0)
        discount.amount = Math.round((price * price_adjustment.value) / 100.0)
        break
      case 'fixed_amount':
        discount.percent = Math.round(((price_adjustment.value * 1.0) / price) * 100.0)
        discount.absolute = price_adjustment.value
        discount.amount = price_adjustment.value
        break
      case 'price':
        discount.percent = Math.round((((compareAtPrice * multiplier - price_adjustment.value) * 1.0) / (compareAtPrice * multiplier)) * 100.0)
        discount.absolute = compareAtPrice * multiplier - price_adjustment.value
        discount.amount = price - price_adjustment.value
        break
    }

    return discount
  }
  // !SECTION: Discount Functions
  price(selling_plan, formatted = true) {
    return formatted ? this.money(this.selectedVariant.price - this.discount(selling_plan).amount) : this.selectedVariant.price - this.discount(selling_plan).amount
  }

  fetchProduct = handle => {
    return fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${handle}.js`)
      .then(response => response.json())
      .then(product => {
        this.product = product
        this.selectedVariant = product.variants[0]

        return product
      })
  }
  // !SECTION: Additional Functionality
}

if(customElements.get('skio-plan-picker') === undefined) {
  customElements.define('skio-plan-picker', SkioPlanPicker)
}

export default createComponent({
  tagName: 'skio-plan-picker',
  elementClass: SkioPlanPicker,
  react: React,
});