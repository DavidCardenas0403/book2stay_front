<template>
  <div>
    <!-- <h1>Price {{ price }}</h1> -->
    <div ref="paypal"></div>     
  </div>
</template>

<script>
export default {
  props: {
    price: { // Define la propiedad 'price' como parámetro del componente
      type: String, // Tipo de dato esperado
      required: true // Hace que sea obligatorio pasar este parámetro al componente
    }
  },
  data() {
    return {
      isPaymentAmountModalVisible: false
    }
  },
  mounted() {
    const script = document.createElement("script");
    // script.src = "https://www.paypal.com/sdk/js?client-id=AZ72ZToyMCPpyeqSIX628iO9L-PGY_51Pxbo6LVu4zz7SwLFD_j7oxgbG7HpfeRi5fKA42aAUqrYzEMJ&currency=EUR";
    script.src = "https://sandbox.paypal.com/sdk/js?client-id=AfogMKE4hBwYbWjGM0fMBDLzEtn1kDRVDcEXXhhVlwrIGlF7Cl3WaHcjt72bkGM80eZsjuDdKanpUCok&currency=EUR";
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
      const self = this; // Almacena la referencia a `this`
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: self.price,
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            self.$emit("paymentConfirmed")
            // alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }
      }).render(this.$refs.paypal);
    }
  }
}
</script>
