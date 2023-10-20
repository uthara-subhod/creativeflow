import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import Quill from 'quill'
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  editorContent: string = ''; // Initial content
  renderedContent: SafeHtml | undefined; // Rendered HTML content
  chapter: any;
  book: any

  private quill: Quill | any

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private browse: BrowseService) { }
  ngOnInit(): void {
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.browse.getChapter(id).subscribe({
      next: (res) => {
        this.chapter = res.chapter
        this.browse.getBook(res.chapter.book.book_id).subscribe({
          next: (res) => {
            this.book = res.book
            if (this.book.cover == '') {
              this.book.cover = '../../../../../assets/images/cover-dummy.jpg'
            }
          },
          error: () => {
            this.router.navigate(['/error'])
          }
        })
      },
      error: () => {
        this.router.navigate(['/error'])
      }
    })

  }
  @ViewChild('editor') editorElement: ElementRef | null = null;
  @ViewChild('toolbar') toolbarElement: ElementRef | null = null;

  ngAfterViewInit(): void {
    this.quill = new Quill(this.editorElement?.nativeElement, {
      theme: 'snow', // Choose a Quill theme (e.g., 'snow' for a basic editor)
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean']
        ]
      }
    });
    const toolbarElement = this.quill.getModule('toolbar').container;
    if(this.chapter.content&& this.chapter.content!==''){

      this.quill.clipboard.dangerouslyPasteHTML(this.chapter.content);
    }

    // Add a custom class to the toolbar element
    toolbarElement.classList.add('sticky-top');
    this.quill.on('text-change', () => {
      this.saveFormattedContent(); // Call your save method when text changes
    });
  }

  saveFormattedContent() {
    const formattedText = this.quill.root.innerHTML;
    const sanitizedText = DOMPurify.sanitize(formattedText);
    this.chapter.content = sanitizedText;
  }

  // Retrieve and render the content from the database
  getFormattedContent() {
    // this.myService.getContent().subscribe(content => {
    //   // Assuming 'content' is the sanitized and formatted content from the database
    //   this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(content);
    // });
  }

  // Sanitize and format content (simplified example)
  sanitizeAndFormatContent(content: string): string {
    // In a real application, you would use a library like DOMPurify for sanitization
    // For simplicity, we're just wrapping the content in a <div> here
    return `<div>${content}</div>`;
  }
}
