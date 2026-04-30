/**
 * VAAVParticles — Motor de partículas 3D orbital reutilizable
 * VAAV Asesores Patrimoniales © 2025
 */
class VAAVParticles {
  constructor(canvasId, options = {}) {
    this.canvasId = canvasId;
    this.count = options.count || 120;
    this.speedMult = options.speedMult !== undefined ? options.speedMult : 1;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animFrame = null;
    this.colors = [
      '#e83c4b',
      '#c81727',
      '#ff6470',
      'rgba(255,255,255,0.8)'
    ];
    this._resizeHandler = this._onResize.bind(this);
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    if (!this.canvas) return;

    this.canvas.style.position = 'absolute';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';

    this.ctx = this.canvas.getContext('2d');
    this._resize();
    this._createParticles();
    this.animate();
    window.addEventListener('resize', this._resizeHandler);
  }

  _resize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent ? parent.offsetWidth : window.innerWidth;
    this.canvas.height = parent ? parent.offsetHeight : window.innerHeight;
  }

  _onResize() {
    this._resize();
    this.particles = [];
    this._createParticles();
  }

  _rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  _createParticles() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    for (let i = 0; i < this.count; i++) {
      const z = Math.random();
      const tailLen = Math.floor(this._rand(3, 11));
      this.particles.push({
        cx: this._rand(0, w),
        cy: this._rand(0, h),
        orbitR: this._rand(40, 200),
        angle: this._rand(0, Math.PI * 2),
        tilt: this._rand(-0.6, 0.6),
        speed: this._rand(0.003, 0.011) * (Math.random() > 0.5 ? 1 : -1),
        size: this._rand(1, 3.5),
        alpha: this._rand(0.3, 1.0),
        z: z,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        tail: [],
        tailMaxLen: tailLen
      });
    }
  }

  _update(p) {
    p.angle += p.speed * this.speedMult;
    const x = p.cx + Math.cos(p.angle) * p.orbitR;
    const y = p.cy + Math.sin(p.angle) * p.orbitR * Math.cos(p.tilt);
    p.tail.push({ x, y });
    if (p.tail.length > p.tailMaxLen) {
      p.tail.shift();
    }
  }

  _draw(p) {
    const ctx = this.ctx;
    const tail = p.tail;
    if (tail.length < 2) return;

    // Draw tail
    for (let i = 1; i < tail.length; i++) {
      const progress = i / tail.length;
      const tailAlpha = progress * p.alpha * 0.5 * (0.4 + 0.6 * p.z);
      const tailWidth = progress * p.size * (0.3 + 0.7 * p.z) * 0.7;

      ctx.beginPath();
      ctx.moveTo(tail[i - 1].x, tail[i - 1].y);
      ctx.lineTo(tail[i].x, tail[i].y);
      ctx.strokeStyle = this._colorWithAlpha(p.color, tailAlpha);
      ctx.lineWidth = Math.max(0.3, tailWidth);
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Draw main particle
    const last = tail[tail.length - 1];
    const depthScale = 0.4 + 0.6 * p.z;
    const finalSize = p.size * depthScale;
    const finalAlpha = p.alpha * depthScale;

    ctx.beginPath();
    ctx.arc(last.x, last.y, finalSize, 0, Math.PI * 2);
    ctx.fillStyle = this._colorWithAlpha(p.color, finalAlpha);
    ctx.fill();
  }

  _colorWithAlpha(color, alpha) {
    if (color.startsWith('rgba')) {
      // Replace existing alpha
      return color.replace(/[\d.]+\)$/, `${alpha})`);
    }
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    return color;
  }

  animate() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Motion blur background
    ctx.fillStyle = 'rgba(13,13,26,0.18)';
    ctx.fillRect(0, 0, w, h);

    for (const p of this.particles) {
      this._update(p);
      this._draw(p);
    }

    this.animFrame = requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }
    window.removeEventListener('resize', this._resizeHandler);
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
