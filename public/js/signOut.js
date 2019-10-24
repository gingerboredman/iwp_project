
window.addEventListener('load', () => {
    document.getElementById('signOutButton').addEventListener('click', () => {
        sessionStorage.removeItem('token')
    })
})