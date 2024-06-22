import {
    ArrayField,
    BooleanField,
    DropdownField,
    NestedFields,
    ObjectField,
    SliderField,
    TextField
} from "../components/fields";

import Feature from "../components/feature";
import SectionHeader from "../components/sectionHeader";
import {produce} from "immer";

function deepValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
};


function parseFeature(feature, data, path, setData) {
    const featureChildren = []
    Object.keys(feature).forEach((fieldName) => {
        const field = feature[fieldName]
        // eslint-disable-next-line default-case
        switch (field.type) {
            case "text": {
                // set as child of newFeature
                return featureChildren.push(<TextField name={fieldName} tooltip={field.tooltip}
                                                       defaultValue={field.default} onChange={(newValue) => {
                    setData(produce(data, draft => {
                        deepValue(draft, path)[fieldName] = newValue
                    }))
                }}/>)
            }
            case "number": {
                return featureChildren.push(<SliderField name={fieldName} tooltip={field.tooltip}
                                                         defaultValue={field.default}
                                                         min={field.min} max={field.max}
                                                         step={field.step} onChange={
                    (newValue) => {
                        setData(produce(data, draft => {
                            deepValue(draft, path)[fieldName] = newValue
                        }))
                    }
                }/>)
            }
            case "boolean": {
                return featureChildren.push(<BooleanField name={fieldName} tooltip={field.tooltip}
                                                          defaultValue={field.default} onChange={
                    (newValue) => {
                        setData(produce(data, draft => {
                            deepValue(draft, path)[fieldName] = newValue
                        }))
                    }
                }/>)
            }
            case "array": {
                return featureChildren.push(<ArrayField name={fieldName} tooltip={field.tooltip}
                                                        defaultValue={field.default} onChange={
                    (newValue) => {
                        setData(produce(data, draft => {
                            deepValue(draft, path)[fieldName] = newValue
                        }))
                    }
                }/>)
            }
            case "object": {
                return featureChildren.push(<ObjectField name={fieldName} tooltip={field.tooltip}
                                                         defaultValue={field.default} onChange={
                    (newValue) => {
                        setData(produce(data, draft => {
                            deepValue(draft, path)[fieldName] = newValue
                        }))
                    }
                }/>)
            }
            case "enum": {
                return featureChildren.push(<DropdownField name={fieldName} tooltip={field.tooltip}
                                                           defaultValue={field.default}
                                                           options={field.values} onChange={
                    (newValue) => {
                        setData(produce(data, draft => {
                            deepValue(draft, path)[fieldName] = newValue
                        }))
                    }
                }/>)
            }
        }

        if (!field.type && field.tooltip) {
            const nested = parseFeature(field, data, `${path}.${fieldName}`, setData)
            return featureChildren.push(<NestedFields name={fieldName} tooltip={field.tooltip}>
                {nested}
            </NestedFields>)
        }
    })

    return featureChildren
}

export function parseSchema(schema, data, setData) {
    const sections = []
    const features = []

    Object.keys(schema).forEach((section) => {
        sections.push(<SectionHeader title={section} key={section}/>)

        Object.keys(schema[section]).forEach((feature) => {
            const featureChildren = parseFeature(schema[section][feature], data, `${section}.${feature}`, setData)

            features.push(<Feature key={`${section}-${feature}`} name={feature} section={section}
                                   description={schema[section][feature].description}>
                {featureChildren}
            </Feature>)
        })
    })

    return {
        sections,
        features
    }
}

export function schemaToDefault(schema) {
    const data = {}
    Object.keys(schema).forEach((section) => {
        data[section] = {}
        Object.keys(schema[section]).forEach((feature) => {
            if (feature === "description" || feature === "tooltip") return
            const featureData = {}
            const fields = schema[section][feature]
            Object.keys(fields).forEach((field) => {
                if (field === "description") return
                if (!fields[field].type && fields[field].tooltip) {
                    featureData[field] = schemaToDefault({[field]: fields[field]})[field]
                    return
                }
                featureData[field] = fields[field].default
            })
            data[section][feature] = featureData
        })
    })

    return data
}