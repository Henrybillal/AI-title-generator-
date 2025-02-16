const adjectives = ["Premium", "Advanced", "Smart", "Innovative", "Professional", "Ultimate", "Next-Gen"];
const verbs = ["Enhance", "Revolutionize", "Transform", "Elevate", "Boost", "Upgrade"];

// Update adjectives and verbs based on tone
const toneSettings = {
    professional: {
        adjectives: ["Premium", "Advanced", "Enterprise", "Professional", "Industrial"],
        verbs: ["Enhance", "Optimize", "Streamline", "Maximize", "Elevate"]
    },
    casual: {
        adjectives: ["Awesome", "Smart", "Cool", "Handy", "Everyday"],
        verbs: ["Boost", "Simplify", "Upgrade", "Revamp", "Spruce up"]
    },
    seo: {
        adjectives: ["Best", "Top-Rated", "Buy", "Affordable", "Quality"],
        verbs: ["Discover", "Shop", "Save", "Compare", "Find"]
    }
};

function generateContent() {
    const tone = document.getElementById('tone').value;
    const category = document.getElementById('category').value;
    const keywords = document.getElementById('keywords').value.trim();
    const features = document.getElementById('features').value.trim();
    
    if (!keywords || !features) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Get tone-specific words
    const { adjectives: toneAdjectives, verbs: toneVerbs } = toneSettings[tone];
    
    // Update description based on category
    let categoryText = "";
    switch(category) {
        case 'electronics':
            categoryText = "cutting-edge technology";
            break;
        case 'fashion':
            categoryText = "trend-setting style";
            break;
        case 'home':
            categoryText = "premium home solutions";
            break;
        default:
            categoryText = "innovative products";
    }
    
    // Add loading state
    const btn = document.querySelector('.generate-btn');
    btn.innerHTML = `<i class="fas fa-spinner loading"></i> Generating...`;
    btn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Generate title
        const titleAdjective = toneAdjectives[Math.floor(Math.random() * toneAdjectives.length)];
        const titleVerb = toneVerbs[Math.floor(Math.random() * toneVerbs.length)];
        const productTitle = `${titleAdjective} ${keywords} - ${titleVerb} Your Experience`;
        
        // Generate description
        let description = `Introducing our ${titleAdjective.toLowerCase()} ${keywords} `;
        description += `designed for ${categoryText} to ${titleVerb.toLowerCase()} your daily life. `;
        description += "Featuring:\n";
        description += features.split(',').map(f => `• ${f.trim()}\n`).join('');
        description += `\nExperience unparalleled quality and innovation with our state-of-the-art ${keywords}. `;
        description += "Perfect for modern users who demand the best in performance and reliability.";

        // Display results
        document.getElementById('productTitle').textContent = productTitle;
        document.getElementById('productDescription').textContent = description;
        document.querySelector('.result').style.display = 'block';
        
        btn.innerHTML = `<i class="fas fa-magic"></i> Generate Content`;
        btn.disabled = false;
    }, 800);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'times-circle' : 'check-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function copyToClipboard() {
    const title = document.getElementById('productTitle').textContent;
    const description = document.getElementById('productDescription').textContent;
    const text = `Product Title:\n${title}\n\nProduct Description:\n${description}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Content copied to clipboard!');
    });
}

// Add real-time preview
document.getElementById('keywords').addEventListener('input', debounce(generateContent, 500));
document.getElementById('features').addEventListener('input', debounce(generateContent, 500));

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
} 