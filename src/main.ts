import './style.css'
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcome = document.getElementById('welcome') as HTMLElement;
        const mainContent = document.getElementById('contents') as HTMLElement;

        if (welcome && mainContent) {
            welcome.classList.add('fadeOut');

            setTimeout(() => {
                welcome.style.display = 'none';
                mainContent.style.display = 'block';
            }, 2000);
        }
    }, 1000);
});