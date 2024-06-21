import {
    ArrayField,
    BooleanField,
    DropdownField,
    NestedFields,
    ObjectField,
    SliderField,
    TextField
} from "../components/featureOptions";

import Feature from "../components/feature";

function parseFeature(feature) {
    const featureChildren = []
    Object.keys(feature).forEach((fieldName) => {
        const field = feature[fieldName]
        // eslint-disable-next-line default-case
        switch (field.type) {
            case "text": {
                // set as child of newFeature
                return featureChildren.push(<TextField name={fieldName} tooltip={field.tooltip}
                                                       defaultValue={field.default}/>)
            }
            case "number": {
                return featureChildren.push(<SliderField name={fieldName} tooltip={field.tooltip}
                                                         defaultValue={field.default}
                                                         min={field.min} max={field.max}
                                                         step={field.step}/>)
            }
            case "boolean": {
                return featureChildren.push(<BooleanField name={fieldName} tooltip={field.tooltip}
                                                          defaultValue={field.default}/>)
            }
            case "array": {
                return featureChildren.push(<ArrayField name={fieldName} tooltip={field.tooltip}
                                                        defaultValue={field.default}/>)
            }
            case "object": {
                return featureChildren.push(<ObjectField name={fieldName} tooltip={field.tooltip}
                                                         defaultValue={field.default}/>)
            }
            case "enum": {
                return featureChildren.push(<DropdownField name={fieldName} tooltip={field.tooltip}
                                                           defaultValue={field.default}
                                                           options={field.values}/>)
            }
        }

        if (!field.type && field.tooltip) {
            const nested = parseFeature(field)
            return featureChildren.push(<NestedFields name={fieldName} tooltip={field.tooltip}>
                {nested}
            </NestedFields>)
        }
    })

    return featureChildren
}

export default function parseSchema(schema, layer = 0) {
    const sections = []
    const features = []

    Object.keys(schema).forEach((section) => {
        sections.push(section)
        Object.keys(schema[section]).forEach((feature) => {
            const featureChildren = parseFeature(schema[section][feature])

            features.push(<Feature key={`${section}-${feature}`} name={feature} section={section} description={schema[section][feature].description}>
                {featureChildren}
            </Feature>)
        })
    })

    return {
        sections,
        features
    }
}