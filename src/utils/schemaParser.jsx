import {
    ArrayField,
    BooleanField,
    DropdownField,
    NestedFeatures,
    ObjectField,
    SliderField,
    TextField
} from "../components/featureOptions";

import Feature from "../components/feature";

export default function parseSchema(schema, layer = 0) {
    const sections = []
    const features = []

    Object.keys(schema).forEach((section) => {
        sections.push(section)
        console.log(`section: ${section} layer: ${layer}`)
        Object.keys(schema[section]).forEach((feature) => {
            console.log(`feature: ${feature}`)
            const featureChildren = []
            Object.keys(schema[section][feature]).forEach((fieldName) => {
                const field = schema[section][feature][fieldName]

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
                    default: {
                        // nested
                        // return featureChildren.push(parseSchema(field, layer + 1).features)
                    }
                }
            })

            const newFeature = layer === 0 ? <Feature name={feature} section={section}>
                {featureChildren}
            </Feature> : <NestedFeatures name={feature}>
                {featureChildren}
            </NestedFeatures>

            features.push(newFeature)
        })
    })

    console.log(features)

    return {
        sections,
        features
    }
}