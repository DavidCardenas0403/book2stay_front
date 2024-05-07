<template>
    <div>
      <h1>{{ price }}</h1>
      <div ref="paypal"></div>     
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        price: '0.10',
        isPaymentAmountModalVisible: false
      }
    },
    mounted() {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AZ72ZToyMCPpyeqSIX628iO9L-PGY_51Pxbo6LVu4zz7SwLFD_j7oxgbG7HpfeRi5fKA42aAUqrYzEMJ";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    methods: {
      openPaymentAmountModal() {
        this.isPaymentAmountModalVisible = true;
      },
      closePaymentAmountModal() {
        this.isPaymentAmountModalVisible = false;
      },
      setLoaded() {
        const self = this; // Store the reference to `this`
        window.paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                    currency: 'EUR', // Establecer la moneda en euros
                  value: self.price
                }
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert('Transaction completed by ' + details.payer.name.given_name);
            });
          }
        }).render(this.$refs.paypal);
      }
    }
  }
  </script>
  