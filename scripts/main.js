const encryptionKeys = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat',
};
const decryptionKeys = Object.fromEntries(
    Object.entries(encryptionKeys).map(([key, value]) => [value, key])
);


const getElementById = (id) => {
    return document.getElementById(id);
};

const encryptText = (text) => {
    return text.replace(/[eioua]/g, match => encryptionKeys[match]);
};

const decryptText = text => {
    let result = text;

    for (const [key, value] of Object.entries(decryptionKeys)) {
        const regex = new RegExp(key, 'g');
        result = result.replace(regex, value);
    }

    return result;
};

const validateInput = text => {
    /^[a-z\s]+$/.test(text);
};

const showBanner = message => {
    const banner = getElementById('banner');
    const bannerMessage = getElementById('banner-message');

    bannerMessage.textContent = message;
    banner.classList.remove('hidden');

    setTimeout(() => banner.classList.add('hidden'), 3000);
};

const encryptByButton = () => {
    const textInput = getElementById('text').value;
    const resultTextarea = getElementById('text-result');

    if (validateInput(textInput)) {
        resultTextarea.value = encryptText(textInput);
        getElementById('text').value = '';
    } else {
        showBanner('Please enter only lowercase letters without accents or special characters.');
    }
};

const decryptByButton = () => {
    const textInput = getElementById('text').value;
    const resultTextarea = getElementById('text-result');

    if (validateInput(textInput)) {
        resultTextarea.value = decryptText(textInput);
        getElementById('text').value = '';
    } else {
        showBanner('Please enter only lowercase letters without accents or special characters.');
    }
};

const copyByButton = () => {
    const resultTextarea = getElementById('text-result');

    resultTextarea.select();
    document.execCommand('copy');
};
