const contextSelectors = (state) => {
  return {
    isModalOpen: () => {
      const { passwordModal } = state;
      const isModalOpen = passwordModal.isOpen;
      return isModalOpen;
    },
    isPanelOpen: () => {
      const { read, update } = state;
      const isPanelOpen = read.isOpen || update.isOpen;
      return isPanelOpen;
    },
  };
};

export default contextSelectors;
