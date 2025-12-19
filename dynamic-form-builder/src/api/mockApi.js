export let forms = [];
export let responses = [];

export const api = {
  createForm(form) {
    const newForm = { ...form, id: Date.now() };
    forms.push(newForm);
    return newForm;
  },

  getForms() {
    return forms;
  },

  submitResponse(formId, values) {
    responses.push({
      id: Date.now(),
      formId,
      values
    });
  },

  getResponses(formId) {
    return responses.filter(r => r.formId === formId);
  },

  updateResponse(responseId, values) {
    responses = responses.map(r =>
      r.id === responseId ? { ...r, values } : r
    );
  }
};
