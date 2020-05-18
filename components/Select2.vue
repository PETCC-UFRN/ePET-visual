<template>
  <select>
    <option></option>
  </select>
</template>

<script>

export default {
  name: "BaseSelect",
  props: {
    url: { type: String },
    value: { type: Object },
    min: { type: Number, default: 3 }
  },
  watch: {
    value(value) {
      $(this.$el).val(value);
    },
    url(url) {
      $(this.$el)
        .empty()
        .select2({
          width: "100%",
          minimumInputLength: this.min,
          language: "pt-BR",
          ajax: {
            url: url,
            dataType: "json"
          }
        });
    }
  },
  mounted() {
    const vm = this;

    $(this.$el)
      .select2({
        width: "100%",
        minimumInputLength: this.min,
        language: "pt-BR",
        placeholder: "Selecione uma opção",
        theme: "bootstrap4",
        ajax: {
          url: this.url,
          dataType: "json",
          delay: 300,
          processResults(data) {
            console.log(data);
            return {
              ...data,
              results: data.results.map(e => ({
                ...e,
                id: JSON.stringify(e.id)
              }))
            };
          }
        }
      })
      .val(this.value)
      .trigger("change")
      .on("change", function() {
        vm.$emit("input", JSON.parse(this.value));
      });
  },
  destroyed() {
    $(this.$el)
      .off()
      .select2("destroy");
  }
};
</script>