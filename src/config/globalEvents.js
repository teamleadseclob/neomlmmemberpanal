// Enter key moves focus to next input or clicks submit button
export function initEnterKeyNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return

    const focusable = Array.from(
      document.querySelectorAll('input, select, textarea, button:not([disabled])')
    ).filter((el) => !el.closest('[aria-hidden]') && el.offsetParent !== null)

    const idx = focusable.indexOf(document.activeElement)
    if (idx === -1) return

    const current = focusable[idx]
    if (current.tagName === 'BUTTON') return
    if (current.tagName === 'TEXTAREA') return

    e.preventDefault()

    let nextIdx = idx + 1
    while (nextIdx < focusable.length) {
      const next = focusable[nextIdx]
      const isEyeBtn      = next.tagName === 'BUTTON' && next.getAttribute('aria-label')?.toLowerCase().includes('password')
      const isReadonly    = next.tagName === 'INPUT'  && next.readOnly
      const isCheckbox    = next.tagName === 'INPUT'  && next.type === 'checkbox'
      const isNonSubmitBtn = next.tagName === 'BUTTON' && next.type !== 'submit'
      if (!isEyeBtn && !isReadonly && !isCheckbox && !isNonSubmitBtn) break
      nextIdx++
    }

    const target = focusable[nextIdx]
    if (!target) return

    if (target.tagName === 'BUTTON') {
      target.click()
    } else {
      target.focus()
    }
  })
}

// Prevent all images from being draggable
export function initNoDrag() {
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault()
  }, true)

  document.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault()
  }, true)
}
