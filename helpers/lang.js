import { useI18n } from "#imports"

export function getPropertyText(property) {
    const {locale} = useI18n()

    const selectedLang = locale.value

    const texts = property?.PropertyTexts.find(i => i.languageCode == selectedLang)

    return texts || property.PropertyTexts[0]
}