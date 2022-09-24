import Select, { components } from 'react-select';
import { useQuery } from 'react-query';
import { api } from '../../../../../../services/api';
import { FaCampground} from 'react-icons/fa';
import styled from "./styles.module.scss";



const { Option } = components;

let options = [];

const colourStyles = {
    container: (props) => {
    },

    control: (props) => ({
        ...props,
        border: "0px solid #ffffff",
        borderColor: "#ffffff",
        boxShadow: "none",
        position: "static",
    }),

    menu: base => ({
        ...base,
        zIndex: 100,
        marginLeft: "-22px",
        marginTop: 5,
        boxShadow: "1px 3px 3px #cccccc"
    }),

    menuList: (styles) => ({
        ...styles,
        background: '#ffffff',
    }),

    option: (styles, { isFocused, isSelected }) => ({
        ...styles,
        background: isFocused
            ? '#FFFBE2'
            : isSelected ? '#ffffff' : undefined,
        zIndex: 1,
        color: isFocused
            ? '#263238'
            : isSelected ? '#263238' : undefined,
    }),
}

async function Options() {
    const { data, isSuccess } = useQuery("categoryFilter", async () => {
        const response = await api.get("/categories/listAll");
        return response.data;
    }, {
        cacheTime: 300000
    });
    if (isSuccess) {
        options = data;
        options.map((option) => {
            option.value = option.titulo;
            option.label = option.titulo;
            option.categoryId = + option.id;
            return 'null'
        })
    }
}



function CustomOption(props) {

    return (
        <Option {...props} className={`${styled.option} d-flex align-items-center mx-auto`}>
            <FaCampground size={28} color="#7d8182" className="me-2" />
            <div>
                <strong className="d-block">{props.data.category.name}</strong>
                {/* <span className="fs-14"> </span> */}
            </div>
        </Option>
    )
}

export function CategorySelector({ Controller, control }) {
    Options();
    return (
            <Controller
            control={control}
            name="categoria"
            render={({ field: { onChange, value, name, ref } }) => (
                <div className="d-flex align-items-center w-100 bg-light rounded position-relative">
                    <FaCampground size={24} color="#7d8182" />
                    <Select
                        className={styled.react_select_container}
                        classNamePrefix="react-select"
                        placeholder="Categoria..."
                        inputRef={ref}
                        options={options}
                        value={options.find(c => c.categoryId === value)}
                        onChange={val => onChange(val.categoryId)}
                        components={{
                            Option: CustomOption,
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null
                        }}
                        styles={colourStyles}
                    />
                </div>
            )}
        />

    )
}





