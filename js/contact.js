// Contact form functionality

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            const errors = validateContactForm(data);
            
            if (errors.length > 0) {
                showFormMessage(formMessage, errors.join(', '), 'error');
                return;
            }
            
            // Set loading state
            setLoadingState(contactForm, true);
            
            try {
                // Simulate form submission (replace with actual API call)
                await simulateFormSubmission(data);
                
                // Success
                showFormMessage(formMessage, 'Mensagem enviada com sucesso! Retornaremos em breve.', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Error
                showFormMessage(formMessage, 'Erro ao enviar mensagem. Tente novamente.', 'error');
                console.error('Form submission error:', error);
            } finally {
                setLoadingState(contactForm, false);
            }
        });
    }
    
    // Real-time validation for email field
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', () => {
            if (emailField.value && !validateEmail(emailField.value)) {
                emailField.style.borderColor = 'var(--error-color)';
                showFieldError(emailField, 'E-mail inválido');
            } else {
                emailField.style.borderColor = 'var(--border-color)';
                hideFieldError(emailField);
            }
        });
    }
    
    // Real-time validation for phone field
    const phoneField = document.getElementById('telefone');
    if (phoneField) {
        phoneField.addEventListener('blur', () => {
            if (phoneField.value && !validatePhone(phoneField.value)) {
                phoneField.style.borderColor = 'var(--error-color)';
                showFieldError(phoneField, 'Telefone inválido');
            } else {
                phoneField.style.borderColor = 'var(--border-color)';
                hideFieldError(phoneField);
            }
        });
    }
});

function validateContactForm(data) {
    const errors = [];
    
    // Required fields
    if (!data.nome?.trim()) {
        errors.push('Nome é obrigatório');
    }
    
    if (!data.email?.trim()) {
        errors.push('E-mail é obrigatório');
    } else if (!validateEmail(data.email)) {
        errors.push('E-mail inválido');
    }
    
    if (!data.servico) {
        errors.push('Tipo de serviço é obrigatório');
    }
    
    if (!data.mensagem?.trim()) {
        errors.push('Mensagem é obrigatória');
    } else if (data.mensagem.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    // Optional phone validation
    if (data.telefone && !validatePhone(data.telefone)) {
        errors.push('Telefone inválido');
    }
    
    return errors;
}

function showFieldError(field, message) {
    // Remove existing error
    hideFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error-color);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

async function simulateFormSubmission(data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log form data (replace with actual API call)
    console.log('Form submission:', data);
    
    // Simulate random success/error for demo
    if (Math.random() > 0.9) {
        throw new Error('Simulated network error');
    }
    
    return { success: true };
}

// Character counter for message field
document.addEventListener('DOMContentLoaded', () => {
    const messageField = document.getElementById('mensagem');
    if (messageField) {
        const maxLength = 500;
        
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: var(--text-light);
            margin-top: 0.25rem;
        `;
        
        messageField.parentNode.appendChild(counter);
        
        // Update counter
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${remaining} caracteres restantes`;
            
            if (remaining < 50) {
                counter.style.color = 'var(--warning-color)';
            } else if (remaining < 0) {
                counter.style.color = 'var(--error-color)';
            } else {
                counter.style.color = 'var(--text-light)';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }
});

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
});