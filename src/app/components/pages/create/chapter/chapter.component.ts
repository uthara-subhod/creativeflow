import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import Quill from 'quill'
import DOMPurify from 'dompurify';
import { CreateService } from 'src/app/services/create.service';

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
  words = 0

  private quill!: Quill

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private create: CreateService) { }
  ngOnInit(): void {
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.create.chapter(id).subscribe({
      next: (res) => {
        this.chapter = res.chapter
        this.create.book(res.chapter.book.book_id).subscribe({
          next: (res) => {
            this.book = res.book
            if (this.book.cover == '') {
              this.book.cover = '../../../../../assets/images/cover-dummy.jpg'
            }
          },
          error: (err:any) => {
            this.router.navigate(['/error'])
          }
        })
      },
      error: (err:any) => {
        this.router.navigate(['/error'])
      }
    })

  }
  @ViewChild('editor') editorElement!: ElementRef ;
  @ViewChild('toolbar') toolbarElement!: ElementRef ;

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
    toolbarElement.classList.add('bg-white');
    const content = this.quill.getText();
    this.words = this.countWords(content)
    console.log(content)
    this.chapter.words = this.words
    this.quill.on('text-change', () => {
      const content = this.quill.getText();
      this.words = this.countWords(content)
      this.chapter.words = this.words

      this.saveFormattedContent(); // Call your save method when text changes
      console.log(this.editorElement.nativeElement.clientHeight, this.editorElement.nativeElement.offsetHeight)
      if ( this.editorElement.nativeElement.offsetHeight > this.editorElement.nativeElement.clientHeight) {
        // If content exceeds viewport, scroll to the bottom
        this.scrollToBottom();
      }
    });
  }

  saveFormattedContent() {
    const formattedText = this.quill.root.innerHTML;

    const sanitizedText = DOMPurify.sanitize(formattedText);
    this.chapter.content = sanitizedText;
  }



  countWords(content: string): number {
    const words = content.split(/\s+/).filter(word => word.trim() !== '');
    console.log(words)
    return words.length;
  }

  // Sanitize and format content (simplified example)
  sanitizeAndFormatContent(content: string): string {

    return `<div>${content}</div>`;
  }

   scrollToBottom() {
    const editor = this.editorElement.nativeElement

    if (editor) {

      editor.scrollTop = editor.offsetHeight;
    }
  }

}
