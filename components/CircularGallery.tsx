'use client';

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: Record<string, unknown>) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof (instance as Record<string, unknown>)[key] === 'function') {
      (instance as Record<string, unknown>)[key] = (
        (instance as Record<string, unknown>)[key] as () => void
      ).bind(instance);
    }
  });
}

type OGLGl = InstanceType<typeof Renderer>['gl'];

function createTextTexture(
  gl: OGLGl,
  text: string,
  font = 'bold 30px monospace',
  color = 'black'
) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { texture: new Texture(gl), width: 0, height: 0 };
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = parseInt(font.match(/\d+/)?.[0] ?? '16', 10);
  const textHeight = Math.ceil(fontSize * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 10;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

type TitleParams = {
  gl: InstanceType<typeof Renderer>['gl'];
  plane: InstanceType<typeof Mesh>;
  renderer: InstanceType<typeof Renderer>;
  text: string;
  textColor?: string;
  font?: string;
  description?: string;
};

class Title {
  gl: TitleParams['gl'];
  plane: TitleParams['plane'];
  renderer: TitleParams['renderer'];
  text: string;
  textColor: string;
  font: string;
  description: string | undefined;
  mesh!: InstanceType<typeof Mesh>;
  descriptionMesh?: InstanceType<typeof Mesh>;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = '#545050',
    font = '30px sans-serif',
    description,
  }: TitleParams) {
    autoBind(this as unknown as Record<string, unknown>);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.description = description;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);

    if (this.description) {
      const descFont = '18px sans-serif';
      const { texture: descTexture, width: descWidth, height: descHeight } = createTextTexture(
        this.gl,
        this.description,
        descFont,
        this.textColor
      );
      const descGeometry = new Plane(this.gl);
      const descProgram = new Program(this.gl, {
        vertex: `
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform sampler2D tMap;
          varying vec2 vUv;
          void main() {
            vec4 color = texture2D(tMap, vUv);
            if (color.a < 0.1) discard;
            gl_FragColor = color;
          }
        `,
        uniforms: { tMap: { value: descTexture } },
        transparent: true,
      });
      this.descriptionMesh = new Mesh(this.gl, { geometry: descGeometry, program: descProgram });
      const descAspect = descWidth / descHeight;
      const descTextHeight = textHeight * 0.7;
      const descTextWidth = descTextHeight * descAspect;
      this.descriptionMesh.scale.set(descTextWidth, descTextHeight, 1);
      this.descriptionMesh.position.y =
        this.mesh.position.y - textHeight * 0.5 - descTextHeight * 0.5 - 0.02;
      this.descriptionMesh.setParent(this.plane);
    }
  }
}

type MediaItem = { image: string; text: string; description?: string };

function parseColorTint(
  imageColor?: string | [number, number, number]
): [number, number, number] {
  if (imageColor === undefined) return [1, 1, 1];
  if (Array.isArray(imageColor)) return imageColor;
  const hex = imageColor.replace(/^#/, '');
  const n = parseInt(hex, 16);
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

type MediaParams = {
  geometry: InstanceType<typeof Plane>;
  gl: InstanceType<typeof Renderer>['gl'];
  image: string;
  index: number;
  length: number;
  renderer: InstanceType<typeof Renderer>;
  scene: InstanceType<typeof Transform>;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
  description?: string;
  imageColor?: string | [number, number, number];
  imageGap?: number;
};

class Media {
  extra = 0;
  geometry: MediaParams['geometry'];
  gl: MediaParams['gl'];
  image: MediaParams['image'];
  index: MediaParams['index'];
  length: MediaParams['length'];
  renderer: MediaParams['renderer'];
  scene: MediaParams['scene'];
  screen: MediaParams['screen'];
  text: MediaParams['text'];
  description: MediaParams['description'];
  viewport: MediaParams['viewport'];
  bend: MediaParams['bend'];
  textColor: MediaParams['textColor'];
  borderRadius: number;
  font: string;
  plane!: InstanceType<typeof Mesh>;
  program!: InstanceType<typeof Program>;
  title!: Title;
  scale = 1;
  padding = 2;
  gap: number;
  colorTint: [number, number, number];
  width = 0;
  widthTotal = 0;
  x = 0;
  speed = 0;
  isBefore = false;
  isAfter = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    description,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font = 'bold 30px Figtree',
    imageColor,
    imageGap = 6,
  }: MediaParams) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.description = description;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.gap = imageGap;
    this.colorTint = parseColorTint(imageColor);
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform vec3 uColorTint;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb * uColorTint, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] as [number, number] },
        uImageSizes: { value: [0, 0] as [number, number] },
        uBorderRadius: { value: this.borderRadius },
        uColorTint: { value: this.colorTint },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
      description: this.description,
    });
  }

  update(
    scroll: { current: number; last: number },
    direction: 'left' | 'right'
  ) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({
    screen,
    viewport,
  }: { screen?: MediaParams['screen']; viewport?: MediaParams['viewport'] } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = this.gap;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

type AppOptions = {
  items?: MediaItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  imageColor?: string | [number, number, number];
  imageGap?: number;
};

class App {
  container: HTMLDivElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  renderer!: InstanceType<typeof Renderer>;
  gl!: OGLGl;
  camera!: InstanceType<typeof Camera>;
  scene!: InstanceType<typeof Transform>;
  planeGeometry!: InstanceType<typeof Plane>;
  mediasImages!: MediaItem[];
  medias!: Media[];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf!: number;
  isDown = false;
  start = 0;
  onCheckDebounce: () => void;
  boundOnResize!: () => void;
  boundOnWheel!: (e: WheelEvent) => void;
  boundOnTouchDown!: (e: TouchEvent | MouseEvent) => void;
  boundOnTouchMove!: (e: TouchEvent | MouseEvent) => void;
  boundOnTouchUp!: () => void;

  constructor(
    container: HTMLDivElement,
    {
      items,
      bend = 1,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05,
      imageColor,
      imageGap = 6,
    }: AppOptions = {}
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font, imageColor, imageGap);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(
    items: MediaItem[] | undefined,
    bend: number,
    textColor: string,
    borderRadius: number,
    font: string,
    imageColor?: string | [number, number, number],
    imageGap = 6
  ) {
    const defaultItems: MediaItem[] = [
      { image: 'https://picsum.photos/seed/1/800/600', text: 'Bridge', description: 'A quiet crossing over still water.' },
      { image: 'https://picsum.photos/seed/2/800/600', text: 'Desk Setup', description: 'Where ideas take shape.' },
      { image: 'https://picsum.photos/seed/3/800/600', text: 'Waterfall', description: 'Nature in motion.' },
      { image: 'https://picsum.photos/seed/4/800/600', text: 'Strawberries', description: 'Fresh and simple.' },
      { image: 'https://picsum.photos/seed/5/800/600', text: 'Deep Diving', description: 'Below the surface.' },
      { image: 'https://picsum.photos/seed/16/800/600', text: 'Train Track', description: 'Paths that lead somewhere.' },
      { image: 'https://picsum.photos/seed/17/800/600', text: 'Santorini', description: 'White walls and blue skies.' },
      { image: 'https://picsum.photos/seed/8/800/600', text: 'Blurry Lights', description: 'City nights in motion.' },
      { image: 'https://picsum.photos/seed/9/800/600', text: 'New York', description: 'The city that never sleeps.' },
      { image: 'https://picsum.photos/seed/10/800/600', text: 'Good Boy', description: 'Man\'s best friend.' },
      { image: 'https://picsum.photos/seed/21/800/600', text: 'Coastline', description: 'Where land meets sea.' },
      { image: 'https://picsum.photos/seed/12/800/600', text: 'Palm Trees', description: 'Sun, sand, and shade.' },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        description: data.description,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
        imageColor,
        imageGap,
      });
    });
  }

  onTouchDown(e: TouchEvent | MouseEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
  }

  onTouchMove(e: TouchEvent | MouseEvent) {
    if (!this.isDown) return;
    const x = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? this.scroll.current) + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: WheelEvent) {
    const delta =
      Math.abs(e.deltaX) > Math.abs(e.deltaY)
        ? e.deltaX
        : e.deltaY ?? (e as unknown as { wheelDelta?: number }).wheelDelta ?? (e as unknown as { detail?: number }).detail ?? 0;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel as EventListener);
    window.addEventListener('wheel', this.boundOnWheel as EventListener);
    window.addEventListener('mousedown', this.boundOnTouchDown as EventListener);
    window.addEventListener('mousemove', this.boundOnTouchMove as EventListener);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown as EventListener);
    window.addEventListener('touchmove', this.boundOnTouchMove as EventListener);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel as EventListener);
    window.removeEventListener('wheel', this.boundOnWheel as EventListener);
    window.removeEventListener('mousedown', this.boundOnTouchDown as EventListener);
    window.removeEventListener('mousemove', this.boundOnTouchMove as EventListener);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown as EventListener);
    window.removeEventListener('touchmove', this.boundOnTouchMove as EventListener);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export type CircularGalleryProps = {
  items?: MediaItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  height?: number;
  imageColor?: string | [number, number, number];
  imageGap?: number;
};

export default function CircularGallery({
  items,
  bend = 3,
  textColor = 'black',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05,
  height = 600,
  imageColor,
  imageGap = 6,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      imageColor,
      imageGap,
    });
    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, imageColor, imageGap]);

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        aria-hidden
      >
        <path
          d="M 0 140 Q 600 40 1200 140"
          fill="none"
          stroke="rgba(255,255,255)"
          strokeWidth=".9"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="circular-gallery"
        ref={containerRef}
        style={{ position: 'relative', zIndex: 112, minHeight: '100%' }}
      />
    </div>
  );
}
