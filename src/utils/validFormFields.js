export const validateForm = (value) => {
  const newErrors = [];
  if (!value.title?.trim()) {
    newErrors.push("Title");
  }

  if (!value.description?.trim()) {
    newErrors.push("Description");
  }

  if (!value.tags?.trim()) {
    newErrors.push("Tags");
  }

  if (!value.priority?.trim()) {
    newErrors.push("Priority");
  }
  return newErrors;
};
