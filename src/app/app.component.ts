import {
  AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, spring } from 'motion';

gsap.registerPlugin(ScrollTrigger);

type CaseStudy = {
  number: string; title: string; period: string; category: string;
  summary: string; contribution: string; stack: string[]; accent: string;
  detail: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stage', { static: true }) stage!: ElementRef<HTMLElement>;
  @ViewChild('portraitFrame', { static: true }) portraitFrame!: ElementRef<HTMLElement>;
  @ViewChild('contactDialog') contactDialog?: ElementRef<HTMLElement>;

  contactOpen = false;
  torchEnabled = true;
  pageRevealed = false;
  private ctx?: gsap.Context;
  private raf = 0;
  private pointer = { x: 0, y: 0 };
  private previousFocus: HTMLElement | null = null;
  private readonly reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  readonly email = 'revanthgarigaboina@gmail.com';
  readonly phone = '+91 9014552618';
  readonly startProjectHref = 'mailto:revanthgarigaboina@gmail.com?subject=Start%20a%20project';
  readonly portfolioUrl = 'https://portfolio-jrl2s2nsx-revanthgarigaboinas-projects.vercel.app/';
  readonly linkedinUrl = 'https://www.linkedin.com/in/revanth-garigaboina-042301200/';
  readonly portraitPath = 'assets/revanth-portrait.jpg'; // Add your own portrait file; the supplied resume PDF contains no portrait.

  readonly studies: CaseStudy[] = [
    {
      number: '01', title: 'IPA LOANS', period: 'JUN 2025 — PRESENT',
      category: 'BANKING · PROCESS AUTOMATION',
      summary: 'A loan workflow connecting multiple banking systems, where accuracy and dependable hand-offs matter.',
      contribution: 'Developed the Intelligent Process Automation Loans application, integrated CLS, TDS and Finacle through REST APIs, added comprehensive validations, and implemented batch processing for rollovers and partial prepayments.',
      stack: ['Java', 'Angular', 'Spring', 'SQL', 'REST APIs', 'Microservices'],
      accent: 'yellow', detail: 'SYSTEMS / TRANSACTIONS / RELIABILITY'
    },
    {
      number: '02', title: 'EMTK', period: 'OCT 2023 — JUN 2025',
      category: 'LEGACY MODERNIZATION · GENAI',
      summary: 'Modernizing established business workflows while introducing a faster bulk-request path.',
      contribution: 'Migrated Apache OFBiz modules to Spring Boot 3.x with Java 17, refactored business logic into REST services, and designed GenAI-assisted bulk validation. The resume records a 98% reduction in execution time for that workflow.',
      stack: ['Java 17', 'Spring Boot 3.x', 'JPA', 'Hibernate', 'Angular', 'SQL'],
      accent: 'red', detail: 'MODERNIZATION / VALIDATION / WORKFLOW'
    },
    {
      number: '03', title: 'SHOPKART', period: 'AUG 2022 — SEP 2023',
      category: 'E-COMMERCE · ORDER MANAGEMENT',
      summary: 'A full-stack shopping lifecycle spanning products, stock, orders, fulfilment and customer feedback.',
      contribution: 'Built full-stack features and REST APIs across product, inventory, order and customer modules, including stock tracking, order processing, shipping, cancellation, delivery, support and feedback workflows.',
      stack: ['Java', 'Spring Boot', 'Hibernate/JPA', 'REST APIs', 'Angular', 'SQL'],
      accent: 'blue', detail: 'PRODUCTS / INVENTORY / CUSTOMER'
    }
  ];

  readonly skillGroups = [
    { label: 'BACKEND & LANGUAGES', items: 'Java 8 / 17 / 21 · Spring Boot · Spring MVC · Python · J2EE · Microservices · Kafka · Maven · Activiti BPMN' },
    { label: 'FRONTEND', items: 'Angular v20 / v21 · TypeScript · JavaScript · HTML · CSS · Node.js' },
    { label: 'DATA & PLATFORM', items: 'MySQL · MariaDB · SQL · AWS · Docker · OCP · Apache Tomcat · Linux' },
    { label: 'DELIVERY & QUALITY', items: 'Jenkins · Drone CI · Git · Bitbucket · JUnit · Mockito · SonarQube · Postman · Jira' },
    { label: 'SECURITY & ENGINEERING', items: 'OAuth2 · SSO · JWT · RBAC · RESTful APIs · Transaction management · Multithreading · DSA' }
  ];

  readonly timeline = [
    { date: 'SEP 2024 — NOW', role: 'Analyst · Software Developer', company: 'DBS Tech', note: 'Enterprise fintech applications with Java 17, Spring Boot 3.x and Angular; OFBiz modernization, REST microservices and role-based workflows.' },
    { date: 'OCT 2023 — SEP 2024', role: 'Senior Officer', company: 'DBS Tech', note: 'Full-stack features for internal fintech platforms, backend APIs, reusable Angular components and Agile delivery.' },
    { date: 'AUG 2022 — SEP 2023', role: 'Full Stack Developer', company: 'Flahcloud Software Private Limited', note: 'E-commerce product, inventory, order, shipping, customer support and feedback modules.' }
  ];

  ngAfterViewInit(): void {
    // Start the flashlight over the portrait so the first reveal is the face.
    requestAnimationFrame(() => {
      const rect = this.portraitFrame.nativeElement.getBoundingClientRect();
      this.updateTorchPosition(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    });

    if (this.reduceMotion) return;
    this.ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from('.eyebrow, .hero-title .line, .hero-copy, .hero-meta', {
        y: 34, opacity: 0, duration: 0.9, stagger: 0.12, clipPath: 'inset(0 0 100% 0)'
      }).from('.hero-art', { y: 50, opacity: 0, duration: 1.1 }, '-=0.8');

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 48, opacity: 0, duration: 0.85, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true }
        });
      });

      gsap.utils.toArray<HTMLElement>('.study-visual').forEach((element) => {
        gsap.fromTo(element, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut',
          scrollTrigger: { trigger: element, start: 'top 78%', once: true }
        });
      });

      const strings = gsap.utils.toArray<SVGPathElement>('.pull-string');
      strings.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: '.collab-section', start: 'top 72%', once: true }
        });
      });
      gsap.from('.pull-hand', {
        x: -18, rotation: -5, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.collab-section', start: 'top 72%', once: true }
      });
    }, this.stage.nativeElement);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.torchEnabled || this.pageRevealed || this.reduceMotion) return;
    this.updateTorchPosition(event.clientX, event.clientY);
  }

  onTouchReveal(event: TouchEvent): void {
    if (!this.torchEnabled || this.pageRevealed) return;
    const touch = event.touches[0];
    if (touch) this.updateTorchPosition(touch.clientX, touch.clientY);
  }

  private updateTorchPosition(x: number, y: number): void {
    this.pointer.x = x;
    this.pointer.y = y;
    if (this.raf) return;

    this.raf = requestAnimationFrame(() => {
      this.stage.nativeElement.style.setProperty('--torch-x', `${this.pointer.x}px`);
      this.stage.nativeElement.style.setProperty('--torch-y', `${this.pointer.y}px`);
      this.raf = 0;
    });
  }

  // A click/tap anywhere on the portfolio permanently reveals the page.
  revealEntirePage(): void {
    if (this.pageRevealed) return;
    this.pageRevealed = true;
    this.torchEnabled = false;
  }

  // Manual flashlight toggle is available until the permanent reveal.
  toggleTorch(): void {
    if (this.pageRevealed) return;
    this.torchEnabled = !this.torchEnabled;
  }

  openContact(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    this.contactOpen = true;
    requestAnimationFrame(() => this.contactDialog?.nativeElement.querySelector<HTMLElement>('[data-first-focus]')?.focus());
  }

  closeContact(): void {
    this.contactOpen = false;
    this.previousFocus?.focus();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.contactOpen) this.closeContact(); }

  @HostListener('document:keydown.tab', ['$event'])
  trapFocus(event: KeyboardEvent): void {
    if (!this.contactOpen || !this.contactDialog) return;
    const nodes = Array.from(this.contactDialog.nativeElement.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])'))
      .filter(node => !node.hasAttribute('disabled'));
    if (!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  buttonHover(event: PointerEvent, entering: boolean): void {
    const button = event.currentTarget as HTMLElement;
    if (this.reduceMotion) return;
    if (entering) animate(button, { y: -5, scale: 1.025, rotate: 0.5 }, { type: spring, stiffness: 280, damping: 18 });
    else animate(button, { y: 0, scale: 1, rotate: 0 }, { duration: 0.35 });
  }

  ngOnDestroy(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.ctx?.revert();
    ScrollTrigger.getAll().forEach(trigger => {
      if (this.stage.nativeElement.contains(trigger.trigger as Node)) trigger.kill();
    });
  }
}
