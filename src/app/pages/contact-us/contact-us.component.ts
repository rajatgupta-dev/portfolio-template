import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  isSubmitting = false;
  showToaster = false;
  
  toastr: { message: string | null, isToastrSuccess: boolean  } = { message: null, isToastrSuccess: true  };
  
  fb = inject(FormBuilder);
  firestore: Firestore = inject(Firestore);
  sanitizer = inject(DomSanitizer);
  contactForm: FormGroup;

  constructor(){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const contactCollection = collection(this.firestore, 'contact-us');
      try {
        await addDoc(contactCollection, this.contactForm.value); 
        this.contactForm.reset();
        this.toastr.message = "Query form submitted successfully!";
        this.setMessageNull();
      } catch (error) {
        this.toastr.message = "An error occurred while submitting the form.";
        this.setMessageNull();
      }
    }
  }

  onEmailClick() {
    const emailUrl = this.sanitizer.bypassSecurityTrustUrl('mailto:rj17.gupta@gmail.com');
    window.location.href = emailUrl.toString();
  }

  setMessageNull(): void{
    setTimeout(() => {
      this.toastr.message = null;
    }, 5000);
  }
}
