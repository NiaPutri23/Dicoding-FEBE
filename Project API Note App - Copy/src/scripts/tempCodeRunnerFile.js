
  function showLoadingIndicator() {
    const loadingIndicator = document.createElement('loading')
    document.body.appendChild(loadingIndicator)
  }

  // menyembunyikan loading indicator
  function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('loading')
    if (loadingIndicator) {
      loadingIndicator.remove()
    }
  }

  //Fungsi API
  // Mendapatkan daftar notes non-archived
  const getUnarchivedNotes = () => {