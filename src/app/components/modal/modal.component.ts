import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="close()" *ngIf="isOpen">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <img [src]="imageSrc" [alt]="imageAlt">
        <button class="close-button" (click)="close()">×</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, 0.8)
        display: flex
        justify-content: center
        align-items: center
        z-index: 1000
        cursor: pointer
        animation: fadeIn 0.3s ease

    .modal-content
        position: relative
        max-width: 90%
        max-height: 90vh
        animation: zoomIn 0.3s ease
        img
            max-width: 100%
            max-height: 90vh
            object-fit: contain
            border-radius: 8px

    .close-button
        position: absolute
        top: -40px
        right: -40px
        background: none
        border: none
        color: white
        font-size: 40px
        cursor: pointer
        padding: 10px
        transition: color 0.3s ease
        &:hover
            color: #ab4040

    @keyframes fadeIn
        from
            opacity: 0
        to
            opacity: 1

    @keyframes zoomIn
        from
            transform: scale(0.9)
            opacity: 0
        to
            transform: scale(1)
            opacity: 1
  `]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() imageSrc = '';
  @Input() imageAlt = '';
  @Output() closeModal = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.isOpen) {
      this.close();
    }
  }

  close() {
    this.closeModal.emit();
  }
} 