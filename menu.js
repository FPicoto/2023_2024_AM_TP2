class menu {
         constructor(canvas, context) {
                        this.canvas = document.querySelector("#canvasCL");
                        this.context = context;
                        this.title = "Bem-vindo ao Meu Jogo";
                        this.buttons = [
                            { label: "Iniciar Jogo", action: () => this.startGame(), image: "assets\images\Large Buttons\Large Buttons\New game Button.png", selectedImage: "assets\images\Large Buttons\Colored Large Buttons\New game col_Button_.png" },
                            { label: "Controlos", action: () => this.showControls(), image: "assets\images\Large Buttons\Large Buttons\Controls Button.png", selectedImage: "assets\images\Large Buttons\Colored Large Buttons\Controls col_Button.png" },
                            { label: "Sair", action: () => this.exitGame(), image: "assets\images\Large Buttons\Large Buttons\Exit Button.png", selectedImage: "assets\images\Large Buttons\Colored Large Buttons\Exit col_Button.png" }
                        ];
                        this.selectedButtonIndex = 0;
                        this.controlsPage = "Os controles do jogo são...";
                        this.currentPage = null;
                    }
                
                    display() {
                        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.context.fillStyle = "#000";
                        this.context.font = "24px Arial";
                        this.context.fillText(this.title, 50, 50);
                        let yOffset = 100;
                        this.buttons.forEach((button, index) => {
                            if (index === this.selectedButtonIndex) {
                                this.context.fillText("-> " + button.label, 50, yOffset);
                                this.renderImage(button.selectedImage ? button.selectedImage : button.image, 200, yOffset - 20);
                            } else {
                                this.context.fillText("   " + button.label, 50, yOffset);
                                this.renderImage(button.image, 200, yOffset - 20);
                            }
                            yOffset += 40;
                        });
                    }
                
                    renderImage(imageSrc, x, y) {
                        const img = new Image();
                        img.src = imageSrc;
                        img.onload = () => {
                            this.context.drawImage(img, x, y, 30, 30);
                        };
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
                        console.log("Iniciar jogo...");
                    }
                
                    showControls() {
                        this.currentPage = this.controlsPage;
                        console.log(this.currentPage);
                    }
                
                    exitGame() {
                        console.log("Sair do jogo...");
                    }
                }
                
                // Exemplo de uso
                const canvas = document.getElementById("canvasCL");
                const context = canvas.getContext("2d");
                const menu = new Menu(canvas, context);
                menu.display();
                
                // Simulando a navegação no menu usando botões interativos
                document.addEventListener("keydown", (event) => {
                    switch (event.key) {
                        case "ArrowUp":
                            menu.selectPreviousButton();
                            break;
                        case "ArrowDown":
                            menu.selectNextButton();
                            break;
                        case "Enter":
                            menu.chooseSelectedButton();
                            break;
                    }
                });