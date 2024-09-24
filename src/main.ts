import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcome = document.querySelector('.welcome') as HTMLElement | null;
        const mainContent = document.getElementById('contents') as HTMLElement | null;
        const body = document.body;

        if (welcome && mainContent) {
            welcome.classList.add('fadeOut');
            mainContent.classList.remove("fadeIn");
            mainContent.classList.add('contents');

            setTimeout(() => {
                welcome.style.display = 'none';
                body.classList.remove("blockInteract");
            }, 2000);
        }
    }, 1000);

        const mainButton = document.getElementById("main-button") as HTMLButtonElement | null;
        const secondButton = document.getElementById("second-button") as HTMLButtonElement | null;
        const thirdButton = document.getElementById("third-button") as HTMLButtonElement | null;

        const mainSkills = document.getElementById("main-skills-list") as HTMLDivElement | null;
        const secondSkills = document.getElementById("second-skills-list") as HTMLDivElement | null;
        const thirdSkills = document.getElementById("third-skills-list") as HTMLDivElement | null;

        if (mainButton && secondButton && thirdButton && mainSkills && secondSkills && thirdSkills) {
            function showSkills(selected: HTMLElement, toHide1: HTMLElement, toHide2: HTMLElement) {
                selected.style.display = 'grid';
                toHide1.style.display = 'none';
                toHide2.style.display = 'none';
            }
            mainButton.addEventListener('click', () => showSkills(mainSkills, secondSkills, thirdSkills));
            secondButton.addEventListener('click', () => showSkills(secondSkills, mainSkills, thirdSkills));
            thirdButton.addEventListener('click', () => showSkills(thirdSkills, mainSkills, secondSkills));
        } else {
            console.error("Un ou plusieurs éléments du DOM ne sont pas chargés correctement.");
        }
    });

    window.onload = () => {
    window.scroll(0, 0);
    setTimeout(() => {
        const timeline = document.getElementById('timeline') as HTMLElement | null;
        const events = document.querySelectorAll('.event') as NodeListOf<HTMLElement>;
        const progressBars = document.querySelectorAll('.progressbar') as NodeListOf<HTMLElement>;

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
            if (timeline && isInViewport(timeline)) {
                timeline.style.width = '100%';
                timeline.classList.add('expanded');
                setTimeout(() => {
                    events.forEach(event => event.style.opacity = '1');
                }, 900);
            }

            progressBars.forEach((progressBar) => {
                const value = progressBar.getAttribute('data-value');
                if (value && isInViewport(progressBar)) {
                    progressBar.style.width = value + '%';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
    }, 3000);
};
