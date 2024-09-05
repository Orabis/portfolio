import './style.css'
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcome = document.querySelector('.welcome') as HTMLElement;
        const mainContent = document.getElementById('contents') as HTMLElement;
        const body = document.body;

        if (welcome && mainContent) {
            welcome.classList.add('fadeOut');
            mainContent.classList.remove("fadeIn");
            mainContent.classList.add('contents');

            setTimeout(() => {
                welcome.style.display = 'none';
                body.classList.remove("blockInteract")
            }, 2000);
        }
    }, 1000);
});
window.onload = () => {
    window.scroll(0, 0);
    setTimeout(() => {
        const timeline = document.getElementById('timeline') as HTMLElement;
        const events = document.querySelectorAll('.event') as NodeListOf<HTMLElement>;
        const isInViewport = (elem: HTMLElement) => {
            const rect = elem.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        const handleScroll = () => {
            if (isInViewport(timeline)) {
                timeline.style.width = '100%';
                timeline.classList.add('expanded');
                setTimeout(() => {
                    events.forEach(event => event.style.opacity = '1');
                }, 900);
                window.removeEventListener('scroll', handleScroll);
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, 3000);

    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach(details => {
        let preentered = 0;
        let entered = 0;

        details.addEventListener('mouseenter', () => {
            if (!details.hasAttribute('open') && entered === 0) {
                details.setAttribute('open', 'true');
                preentered = 1;
                const content = details.querySelector('summary ~ *') as HTMLElement;
                if (content) {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
            if (details.hasAttribute("open") && entered === 1) {
                const content = details.querySelector('summary ~ *') as HTMLElement;
                entered = 0;
                if (content) {
                    content.style.maxHeight = '0';
                    setTimeout(() => details.removeAttribute('open'), 500);
                }
            }
        });

        details.addEventListener('mouseleave', () => {
            if (details.hasAttribute('open') && preentered === 1) {
                entered = 1;
                preentered = 0;
            }
        });
    })
}
