// MyOS Flashcards — a simple study deck (localStorage).
const KEY = 'myos.flashcards';
const card = document.getElementById('fc-card');
const textEl = document.getElementById('fc-text');
const faceEl = document.getElementById('fc-face');
const posEl = document.getElementById('fc-pos');

if (card) {
  let cards = [];
  try { cards = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
  let idx = 0, showBack = false;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cards)); } catch (e) {} };

  function render() {
    posEl.textContent = (cards.length ? idx + 1 : 0) + ' / ' + cards.length;
    if (!cards.length) { textEl.textContent = 'Add a card to begin'; faceEl.textContent = ''; return; }
    const c = cards[idx];
    textEl.textContent = showBack ? c.a : c.q;
    faceEl.textContent = showBack ? 'back (tap to flip)' : 'front (tap to flip)';
  }
  card.addEventListener('click', () => { if (cards.length) { showBack = !showBack; render(); } });
  document.getElementById('fc-prev').addEventListener('click', () => { if (cards.length) { idx = (idx - 1 + cards.length) % cards.length; showBack = false; render(); } });
  document.getElementById('fc-next').addEventListener('click', () => { if (cards.length) { idx = (idx + 1) % cards.length; showBack = false; render(); } });
  document.getElementById('fc-add').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('fc-q'), a = document.getElementById('fc-a');
    if (!q.value.trim() || !a.value.trim()) return;
    cards.push({ q: q.value.trim(), a: a.value.trim() }); idx = cards.length - 1; showBack = false;
    q.value = ''; a.value = ''; save(); render();
  });
  document.getElementById('fc-del').addEventListener('click', () => {
    if (!cards.length) return; cards.splice(idx, 1); if (idx >= cards.length) idx = Math.max(0, cards.length - 1); showBack = false; save(); render();
  });
  render();
}
