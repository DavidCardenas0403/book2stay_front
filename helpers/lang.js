export function getPropertyText(property) {
    const selectedLang = "es"

    const texts = property.PropertyTexts.find(i => i.languageCode == selectedLang)

    return texts || property.PropertyTexts[0]
}