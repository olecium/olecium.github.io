import React from "react";
import {ILanguage, ILanguageMap} from "../common/interfaces/ILanguage";
import {firestore} from "../../Storage";
import css from './LanguageSwitcher.module.scss';

const LanguageSwitcher: React.FC = (): React.ReactElement => {

    const [languages, setLanguages] = React.useState<ILanguage[]>([]);

    const switchLanguage = (id: string) => {

    }

    React.useEffect(() => {
        const getLanguages = async (): Promise<void> => {
            try {
                const langs: ILanguage[] = [];
                const langSnapshot = await firestore.collection('languages').get();
                langSnapshot.docs.forEach((doc) => {
                    const l = doc.data();

                    const lang: ILanguage = {
                        id: l.id,
                        title: l.title,
                        default: l.default
                    }
                    langs.push(lang);
                });

                setLanguages(langs);
            } catch (err) {
                console.log(err);
            }
        }
        getLanguages();
    });

    return(

        <ul className={css.language_switcher}>
            {languages.map(l => {
                const lClass = l.default ? css.language__active : '';
                return (
                    <li key={l.id}><button className={`${css.language} ${lClass}`} onClick={() => {switchLanguage(l.id)}}>{l.title}</button></li>
                )
            })}

        </ul>
    );
}
export default LanguageSwitcher;
