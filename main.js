// CV SIMPLE - JavaScript pour débutant

// Quand la page charge
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== BOUTON MODE SOMBRE ==========
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i> Mode clair';
            showMessage('Mode sombre activé !');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i> Mode sombre';
            showMessage('Mode clair activé !');
        }
    });
    
    // ========== BOUTON CONTACT ==========
    document.getElementById('contactBtn').addEventListener('click', function() {
        showModal(
            'Contactez-moi',
            'Email : ton.email@email.com<br>Téléphone : +33 6 XX XX XX XX<br><br>N\'hésitez pas à m\'envoyer un message !'
        );
    });
    
    // ========== TÉLÉCHARGER CV ==========
    document.getElementById('downloadBtn').addEventListener('click', function() {
        // Créer un simple texte pour le CV
        const cvText = `
            CV DE [TON NOM]
            ================
            
            Formation :
            - Licence Informatique (2ème année)
              Université de [Ton Université]
            
            Compétences :
            - HTML/CSS : 80%
            - JavaScript : 70%
            - Python : 75%
            - Git/GitHub : 60%
            
            Contact :
            Email : ton.email@email.com
            Téléphone : +33 6 XX XX XX XX
        `;
        
        // Créer et télécharger le fichier
        const element = document.createElement('a');
        const file = new Blob([cvText], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'mon_cv.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        showMessage('CV téléchargé !');
    });
    
    // ========== BOUTONS COMPÉTENCES ==========
    document.querySelectorAll('.skill-btn').forEach(button => {
        button.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            showModal(
                'Détail : ' + skill,
                'J\'ai appris ' + skill + ' à l\'université et sur des projets personnels.'
            );
        });
    });
    
    // ========== BOUTONS PROJETS ==========
    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectTitle = this.parentElement.querySelector('h4').textContent;
            showModal(
                projectTitle,
                'Ce projet m\'a permis d\'apprendre les bases du développement web.'
            );
        });
    });
    
    // ========== AJOUTER UN PROJET ==========
    document.getElementById('addProjectBtn').addEventListener('click', function() {
        const projectName = prompt('Nom du nouveau projet :');
        if (projectName) {
            const projectsDiv = document.querySelector('.projects');
            const newProject = document.createElement('div');
            newProject.className = 'project-card';
            newProject.innerHTML = `
                <h4>${projectName}</h4>
                <p>Nouveau projet ajouté</p>
                <p class="tech">À compléter</p>
                <button class="project-btn">Voir détails</button>
            `;
            projectsDiv.insertBefore(newProject, this);
            
            // Ajouter l'événement au nouveau bouton
            newProject.querySelector('.project-btn').addEventListener('click', function() {
                showModal(projectName, 'Projet en cours de développement.');
            });
            
            showMessage('Projet "' + projectName + '" ajouté !');
        }
    });
    
    // ========== ENVOYER MESSAGE ==========
    document.getElementById('sendMsgBtn').addEventListener('click', function() {
        const name = document.getElementById('visitorName').value;
        const message = document.getElementById('visitorMessage').value;
        
        if (!name || !message) {
            showMessage('Veuillez remplir tous les champs !', 'error');
            return;
        }
        
        // Simulation d'envoi
        console.log('Message de ' + name + ' : ' + message);
        
        // Réinitialiser
        document.getElementById('visitorName').value = '';
        document.getElementById('visitorMessage').value = '';
        
        showMessage('Message envoyé ! (simulation)');
    });
    
    // ========== IMPRIMER CV ==========
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
        showMessage('Impression lancée...');
    });
    
    // ========== DATE ACTUELLE ==========
    function updateDate() {
        const now = new Date();
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        document.getElementById('currentDate').textContent = 
            now.toLocaleDateString('fr-FR', options);
    }
    updateDate();
    
    // ========== FONCTION MODAL ==========
    const modal = document.getElementById('simpleModal');
    const closeBtn = document.querySelector('.close');
    
    function showModal(title, text) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalText').innerHTML = text;
        modal.style.display = 'block';
    }
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // ========== FONCTION MESSAGE ==========
    function showMessage(text, type = 'info') {
        // Créer un message temporaire
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : '#4CAF50'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }
    
    // ========== ANIMATION DES BARRES ==========
    function animateBars() {
        const bars = document.querySelectorAll('.skill-level');
        bars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease';
            }, 300);
        });
    }
    
    // Démarrer l'animation
    setTimeout(animateBars, 500);
    
    // ========== ANIMATION CSS ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // ========== COMPTEUR DE VISITES ==========
    let visitCount = localStorage.getItem('cvVisits') || 0;
    visitCount++;
    localStorage.setItem('cvVisits', visitCount);
    console.log('Visite n°' + visitCount);
});