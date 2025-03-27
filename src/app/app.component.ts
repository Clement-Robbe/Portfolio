import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('main') main!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;

  title = 'portfolio';
  private lastScrollY = 0;
  private isMainVisible = true;
  modalOpen = false;
  modalImageSrc = '';
  modalImageAlt = '';

  @HostListener('window:scroll')
  onScroll() {
    if (this.nav) {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 0) {
        this.nav.nativeElement.classList.add('stuck');
        // Add a small delay to ensure the transition is smooth
        setTimeout(() => {
          this.nav.nativeElement.style.transform = 'translateY(0)';
        }, 10);
      } else {
        this.nav.nativeElement.classList.remove('stuck');
        this.nav.nativeElement.style.transform = 'translateY(0)';
      }
      
      // Check if main element is visible
      if (this.main) {
        const mainRect = this.main.nativeElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Consider main visible if it's in the viewport
        this.isMainVisible = mainRect.top < windowHeight && mainRect.bottom > 0;
        
        // Reset background position when main is not visible
        if (!this.isMainVisible) {
          this.main.nativeElement.style.backgroundPosition = 'center center';
        }
      }
      
      this.lastScrollY = currentScrollY;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isMainVisible) return;
    
    try {
      if (!this.main) return;
      
      const main = this.main.nativeElement;
      const rect = main.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      const newX = xPercent * 1;
      const newY = yPercent * 1;
      
      main.style.backgroundPosition = `${newX}% ${newY}%`;
    } catch (error) {
      console.error('Error in mouse move handler:', error);
    }
  }

  openModal(imageSrc: string, imageAlt: string) {
    this.modalImageSrc = imageSrc;
    this.modalImageAlt = imageAlt;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = '/downloads/CV_Clement_Robbe.pdf';
    link.download = 'CV_Clement_Robbe.pdf';
    link.click();
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngAfterViewInit() {
    console.log('View initialized');
  }
}
