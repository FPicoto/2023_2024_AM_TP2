class menu {
        constructor() {
            this.title = "Bem-vindo ao Meu Jogo";
            this.buttons = [
                { label: "Iniciar Jogo", action: () => this.startGame(), image: "New game Button.png", selectedImage: "New game col_Button_.png" },
                { label: "Controlos", action: () => this.showControls(), image: "Controls Button.png", selectedImage: "Controls col_Button.png" },
                { label: "Sair", action: () => this.exitGame(), image: "Return Square Button.png", selectedImage: "Return col_Square Button.png" }
            ];
            this.selectedButtonIndex = 0;
            this.controlsPage = "Os controles do jogo são...";
            this.creditsPage = "Os créditos do jogo são...";
            this.currentPage = null;
        }
    
        display() {
            console.clear();
            console.log(this.title);
            this.buttons.forEach((button, index) => {
                if (index === this.selectedButtonIndex) {
                    console.log("-> " + button.label + " " + (index === this.selectedButtonIndex ? button.selectedImage : button.image));
                } else {
                    console.log("   " + button.label + " " + button.image);
                }
            });
        }
    
        selectNextButton() {
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % this.buttons.length;
            this.display();
        }
    
        selectPreviousButton() {
            this.selectedButtonIndex = (this.selectedButtonIndex - 1 + this.buttons.length) % this.buttons.length;
            this.display();
        }
    
        chooseSelectedButton() {
            const selectedButton = this.buttons[this.selectedButtonIndex];
            this.buttons.forEach(button => {
                button.image = button.selectedImage ? button.selectedImage : button.image;
            });
            this.display();
            selectedButton.action();
        }
    
        startGame() {
            console.log("Iniciar o jogo...");
            // Aqui você pode adicionar a lógica para iniciar o jogo
        }
    
        showControls() {
            this.currentPage = this.controlsPage;
            console.log(this.currentPage);
            // Aqui você pode adicionar a lógica para mostrar os controles do jogo
        }
    
        showCredits() {
            this.currentPage = this.creditsPage;
            console.log(this.currentPage);
            // Aqui você pode adicionar a lógica para mostrar os créditos do jogo
        }
    
        exitGame() {
            console.log("Sair do jogo...");
            // Aqui você pode adicionar a lógica para sair do jogo
        }
    }
    
    // Exemplo de uso
    const menu = new IntroductionMenu();
    menu.display();
    
    // Simulando a navegação no menu usando botões interativos
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp
    