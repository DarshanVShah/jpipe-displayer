// Initial example code
let codes = [
  `function example() {\n    console.log("Hello, World!");\n    return true;\n}`
];

let editingIndex = null;
let highlightEnabled = true;

const codesList = document.getElementById('codes-list');
const addCodeBtn = document.getElementById('addCodeBtn');
const codeModal = document.getElementById('codeModal');
const codeInput = document.getElementById('codeInput');
const saveCodeBtn = document.getElementById('saveCodeBtn');
const cancelCodeBtn = document.getElementById('cancelCodeBtn');
const modalTitle = document.getElementById('modalTitle');
const toggleHighlightBtn = document.getElementById('toggleHighlightBtn');

// If you want to register your custom language, do it here:
// hljs.registerLanguage('jpipe', yourJpipeDefinition);

function renderCodes() {
  codesList.innerHTML = '';
  codes.forEach((code, idx) => {
    const box = document.createElement('div');
    box.className = 'code-container';

    // Actions
    const actions = document.createElement('div');
    actions.className = 'code-actions';
    const editBtn = document.createElement('button');
    editBtn.className = 'secondary-btn';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => openEditModal(idx);
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'secondary-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteCode(idx);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    box.appendChild(actions);

    // Code
    const pre = document.createElement('pre');
    const codeEl = document.createElement('code');
    codeEl.className = 'language-jpipe';
    codeEl.textContent = code;
    pre.appendChild(codeEl);
    box.appendChild(pre);

    codesList.appendChild(box);
  });

  if (highlightEnabled) {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  } else {
    // Remove highlight.js classes but keep code visible
    document.querySelectorAll('pre code').forEach((block) => {
      block.classList.remove('hljs');
      // Remove all classes except language-jpipe
      block.className = 'language-jpipe';
      // Remove any inline styles added by highlight.js
      block.removeAttribute('style');
    });
  }
}

function toggleHighlight() {
  highlightEnabled = !highlightEnabled;
  toggleHighlightBtn.classList.toggle('active', highlightEnabled);
  renderCodes();
}

function openAddModal() {
  editingIndex = null;
  codeInput.value = '';
  modalTitle.textContent = 'Add Code';
  codeModal.classList.remove('hidden');
  codeInput.focus();
}

function openEditModal(idx) {
  editingIndex = idx;
  codeInput.value = codes[idx];
  modalTitle.textContent = 'Edit Code';
  codeModal.classList.remove('hidden');
  codeInput.focus();
}

function saveCode() {
  const val = codeInput.value.trim();
  if (!val) return;
  if (editingIndex === null) {
    codes.push(val);
  } else {
    codes[editingIndex] = val;
  }
  closeModal();
  renderCodes();
}

function deleteCode(idx) {
  if (confirm('Delete this code snippet?')) {
    codes.splice(idx, 1);
    renderCodes();
  }
}

function closeModal() {
  codeModal.classList.add('hidden');
  codeInput.value = '';
  editingIndex = null;
}

addCodeBtn.onclick = openAddModal;
saveCodeBtn.onclick = saveCode;
cancelCodeBtn.onclick = closeModal;
toggleHighlightBtn.onclick = toggleHighlight;

// Close modal on Escape
window.addEventListener('keydown', (e) => {
  if (!codeModal.classList.contains('hidden') && e.key === 'Escape') {
    closeModal();
  }
});

// Initial render
renderCodes(); 