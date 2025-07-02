 // GSAP Animations
        gsap.registerPlugin();

        // Hero animations
        gsap.from(".profile-img", {duration: 1, scale: 0, ease: "bounce.out", delay: 0.5});
        gsap.from(".hero h1", {duration: 1, y: 50, opacity: 0, delay: 0.8});
        gsap.from(".hero p", {duration: 1, y: 30, opacity: 0, delay: 1});
        gsap.from(".cta-button", {duration: 1, y: 30, opacity: 0, delay: 1.2});

        // Scroll animations
        gsap.utils.toArray("section").forEach((section, i) => {
            gsap.from(section.children, {
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Project cards hover animation
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {duration: 0.3, rotationY: 5, z: 50});
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {duration: 0.3, rotationY: 0, z: 0});
            });
        });

        // Three.js background
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('.hero-bg'), alpha: true});

        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create particles
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        for (let i = 0; i < 1000; i++) {
            vertices.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000
            );
            
            colors.push(
                Math.random(),
                Math.random() * 0.5 + 0.5,
                1
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 1000;

        function animate() {
            requestAnimationFrame(animate);
            
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de succès
            gsap.to('.send-button', {
                duration: 0.3,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    alert('Message envoyé avec succès! (Simulation)');
                    this.reset();
                }
            });
        });

        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
            particle.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 6000);
        }

        setInterval(createParticle, 300);

        // Navigation background change on scroll
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('nav');
                if (window.scrollY > 50) {
                    nav.style.background = 'rgba(255, 255, 255, 0.15)';  // fond blanc très transparent
                    nav.style.backdropFilter = 'blur(20px)';
                    nav.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.1)';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.05)';
                    nav.style.backdropFilter = 'blur(10px)';
                    nav.style.boxShadow = 'none';
                }
            });
            
                const content = [
                    "Bienvenue sur mon portfolio !",
                    "Passionné par le développement web et les technologies modernes, je crée des expériences digitales élégantes, performantes et intuitives.\n\n",
                    "À travers mes projets, je cherche à allier créativité et technique pour résoudre des problèmes concrets et offrir des solutions innovantes.\n\n",
                    "Que ce soit en front-end avec React, en back-end avec Spring Boot, ou en automatisation via Python, j’adore relever de nouveaux défis et apprendre constamment.\n\n",
                    "Parcourez mes réalisations et n’hésitez pas à me contacter pour collaborer sur vos idées !"
                ];

        const target = document.getElementById('about-text');

        let indexContent = 0;
        let indexChar = 0;

        function type() {
        if (indexContent >= content.length) return; // Fin du texte

        const currentString = content[indexContent];

        if (indexChar < currentString.length) {
            // Ajoute le caractère un par un
            // Attention : comme il y a du HTML dans content[0], on va insérer en innerHTML à chaque étape.
            target.innerHTML += currentString.charAt(indexChar);
            indexChar++;
            setTimeout(type, 30);
        } else {
            // Fin d'un segment de texte, passe au suivant
            indexContent++;
            indexChar = 0;

            // Ajoute une ligne vide (saut) si ce n'est pas le premier segment (pour espacer les paragraphes)
            if(indexContent > 0 && indexContent < content.length){
            target.innerHTML += '<br><br>';
            }

            setTimeout(type, 200);
        }
        }

        type();
