import React from "react";
import {Book, IBookProps} from "../Book/Book";
import css from "./WeekPlanner.module.scss";
import {useBookUpdate} from "../common/hooks/useBookUpdate";
import {useAuthorUpdate} from "../common/hooks/useAuthorUpdates";
import {firestore} from "../../Storage";
import firebase from "firebase";
import {ILanguage, ILanguageMap} from "../common/interfaces/ILanguage";
import {useAuth} from "../Login/hooks/useAuth";
import {Droppable} from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import PlannerBook from "./PlannerBook/PlannerBook";
import { v4 as uuidv4 } from 'uuid';
import {useFavouriteBookUpdates} from "../common/hooks/useFavouriteBookUpdates";
import {IBook} from "../common/interfaces/IBook";


interface IWeekDay {
    day: string,
    dayBooks: IBookProps[]
}
const WeekPlanner: React.FC = (): React.ReactElement => {

    const {user} = useAuth();
    const {books} = useBookUpdate();
    const {authors} = useAuthorUpdate();
    const {favouriteBooks} = useFavouriteBookUpdates();
    const columnId = 'bookList';

    const [daysWeek, setDaysWeek] = React.useState<IWeekDay[]>([]);
    const [bookProps, setBookProps] = React.useState<IBookProps[]>([]);
    const [languages, setLanguages]= React.useState<ILanguageMap>({});
    const [showWeekPlan, setShowWeekPlan]= React.useState<boolean>(false);

    const onShowPlan = () => {
        setShowWeekPlan(!showWeekPlan);
    }

    const removePlannedBook = async (bookId: string, day: string) => {
/*

            const newDaysWeek = daysWeek.map( x => {
                if(x.day === day){

                    const newB = x.dayBooks.filter(b => (b.id !== bookId));
                    return {day: x.day, dayBooks: newB};

                }
                return x;
            });
            setDaysWeek(newDaysWeek);
*/
            try{
                if(user === undefined || user === null) return;
                const userPlannerRef = await firestore.collection("user_week_planner").doc(user.uid);
                await userPlannerRef.update({
                    [day]: firebase.firestore.FieldValue.arrayRemove(bookId)
                });
                await retrieveUserWeekPlanner();
            }
            catch(err) {
                console.log(err);
            }

    }

    const onDragEnd = async (result: any) => {
        try{
            if(user === undefined || user === null) return;
            const {destination, source, draggableId} = result;
            if(!destination) {
                return;
            }
            if(
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return;
            }

            const sourcePlace = source.droppableId;
            const destinationPlace = destination.droppableId;

            if(sourcePlace !== destinationPlace){

                if(sourcePlace === 'bookList') {
                    // moving books from bookList to the week planner (weekDays)

                    /*
                    *    * */const newDaysWeek = daysWeek;
                const dBook = bookProps.filter(x => x.id === draggableId);
                const draggedBook = dBook.map(x => {
                    return {...x, id: uuidv4()}
                });
                newDaysWeek.forEach(x => {
                    if (x.day === destination.droppableId) {
                        x.dayBooks.push(draggedBook[0]);
                    }
                });
                setDaysWeek(newDaysWeek);



                    if(user === undefined || user === null) return;
                    const userPlannerRef = await firestore.collection("user_week_planner").doc(user.uid);
                    await userPlannerRef.update({
                        [destination.droppableId]: firebase.firestore.FieldValue.arrayUnion(draggableId)
                    });
                    await retrieveUserWeekPlanner();


                } else {
                    // moving books between days of the week

                    const userPlannerRef = await firestore.collection("user_week_planner").doc(user.uid);
                    await userPlannerRef.update({
                        [source.droppableId]: firebase.firestore.FieldValue.arrayRemove(draggableId)
                    });
                    await retrieveUserWeekPlanner();

                     await userPlannerRef.update({
                        [destination.droppableId]: firebase.firestore.FieldValue.arrayUnion(draggableId)
                    });
                    await retrieveUserWeekPlanner();

                }
            } else {
                if(sourcePlace === 'bookList') {
                    // Reordering books in the bookList
                    const newBookOrder = Array.from(bookProps);
                    const draggedBook = newBookOrder.filter(x => x.id === draggableId);

                    newBookOrder.splice(source.index, 1);
                    newBookOrder.splice(destination.index, 0, draggedBook[0]);

                    setBookProps(newBookOrder);
                    return;
                } else {
                    // reordering books withing the day
                    const fromDay = daysWeek.filter(x => x.day === source.droppableId);
                    const draggedBook = fromDay[0].dayBooks.filter(x => x.id === draggableId);

                    let newDaysWeek = daysWeek.map( x => {
                        let newBooks = x.dayBooks;
                        if(x.day === source.droppableId){
                            newBooks.splice(source.index, 1);
                        }
                        if(x.day === destination.droppableId){
                            newBooks.splice(destination.index, 0, draggedBook[0]);
                            return {day: x.day, dayBooks: newBooks};
                        }
                        return x;
                    });
                    setDaysWeek(newDaysWeek);
                }
            }

        }
        catch(err) {
            console.log(err);
        }

    }

    /*
    const onDragEnd = (result: any) => {
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourcePlace = source.droppableId;
        const destinationPlace = destination.droppableId;

        if (sourcePlace !== destinationPlace) {

            if (sourcePlace === 'bookList') {
                // moving books from bookList to the week planner (weekDays)

                const newDaysWeek = daysWeek;
                const dBook = bookProps.filter(x => x.id === draggableId);
                const draggedBook = dBook.map(x => {
                    return {...x, id: uuidv4()}
                });
                newDaysWeek.forEach(x => {
                    if (x.day === destination.droppableId) {
                        x.dayBooks.push(draggedBook[0]);
                    }
                });
                setDaysWeek(newDaysWeek);

            } else {
                // moving books between days of the week
                const fromDay = daysWeek.filter(x => x.day === source.droppableId);
                const draggedBook = fromDay[0].dayBooks.filter(x => x.id === draggableId);

                let newDaysWeek = daysWeek.map(x => {
                    let newBooks = x.dayBooks;
                    if (x.day === source.droppableId) {
                        newBooks.splice(source.index, 1);
                    }
                    if (x.day === destination.droppableId) {
                        newBooks.splice(destination.index, 1, draggedBook[0]);
                        return {day: x.day, dayBooks: newBooks};
                    }
                    return x;
                });
                setDaysWeek(newDaysWeek);
            }
        } else {
            if (sourcePlace === 'bookList') {
                // Reordering books in the bookList
                const newBookOrder = Array.from(bookProps);
                const draggedBook = newBookOrder.filter(x => x.id === draggableId);

                newBookOrder.splice(source.index, 1);
                newBookOrder.splice(destination.index, 0, draggedBook[0]);

                setBookProps(newBookOrder);
                return;
            } else {
                // reordering books withing the day
                const fromDay = daysWeek.filter(x => x.day === source.droppableId);
                const draggedBook = fromDay[0].dayBooks.filter(x => x.id === draggableId);

                let newDaysWeek = daysWeek.map(x => {
                    let newBooks = x.dayBooks;
                    if (x.day === source.droppableId) {
                        newBooks.splice(source.index, 1);
                    }
                    if (x.day === destination.droppableId) {
                        newBooks.splice(destination.index, 0, draggedBook[0]);
                        return {day: x.day, dayBooks: newBooks};
                    }
                    return x;
                });
                setDaysWeek(newDaysWeek);
            }
        }

    }
*/
    React.useEffect(() => {

        const getLanguages = async (): Promise<void> => {
            try {

                if(user === undefined || user === null) return;
                const languages: ILanguage[] = [];
                const langSnapshot = await firestore.collection('languages').get();
                langSnapshot.docs.forEach((doc) => {
                    const l = doc.data();

                    const lang: ILanguage = {
                        id: l.id,
                        title: l.title
                    }
                    languages.push(lang);
                });

                const languagesMap: ILanguageMap = {};
                for (const l of languages) {
                    languagesMap[l.id] = l.title;
                }
                setLanguages(languagesMap);
            } catch (err) {
                console.log(err);
            }
        }
        getLanguages();

    },[user]);

    React.useEffect(() => {

        if(Object.keys(books).length > 0 && Object.keys(authors).length > 0  && Object.keys(languages).length > 0){

            const result: IBookProps[] = [];

            for(const k in books) {
                const b = books[k];
                const a = authors[b.author_id];
                const langTitle = languages[b.language];

                const fav = favouriteBooks.indexOf(b.id) !== -1;
                if (fav){
                    const bp: IBookProps = {
                        ...b,
                        authorName: a ? `${a.name} ${a.surname}` : `Unknown`,
                        langTitle: langTitle,
                        fav: fav
                    };
                    result.push(bp);
                }
            }
            setBookProps(result);
        }
    }, [books, authors, favouriteBooks, languages]);

    const retrieveUserWeekPlanner = async (): Promise<void> => {

        const daysWeek: IWeekDay[] = [
            {
                day: 'Monday',
                dayBooks: []
            } ,{
                day: 'Tuesday',
                dayBooks: []
            },{
                day: 'Wednesday',
                dayBooks: []
            }, {
                day: 'Thursday',
                dayBooks: []
            }, {
                day: 'Friday',
                dayBooks: []
            }, {
                day: 'Saturday',
                dayBooks: []
            },{
                day: 'Sunday',
                dayBooks: []
            }];

            if(user === undefined || user === null) return;
            const pBooksSnapshot = await firestore.collection('user_week_planner').doc(user.uid).get();
            const pb = pBooksSnapshot.data();

            if(pb){
                daysWeek.forEach(dd => {
                    for (const [key, value] of Object.entries(pb)) {
                        if(key === dd.day) {
                            let bookDetails: any = [];
                            if(value.length > 0){
                                value.forEach((item: string) => {
                                    bookDetails = books[item];
                                    dd.dayBooks.push(bookDetails);
                                })
                            }

                        }
                    }
                })
            }
            setDaysWeek(daysWeek);

    }

    React.useEffect(() => {

        const getPlannedBooks = async (): Promise<void> => {
            try {
                await retrieveUserWeekPlanner();
            } catch (err) {
                console.log(err);
            }
        }
        getPlannedBooks();

    },[user, books]);

    return(

        <DragDropContext onDragEnd={onDragEnd}>
            <h1 className="primary_title">Избранные книги</h1>
            <button onClick={onShowPlan}>
                {showWeekPlan ?
                    'Скрыть план'
                    :
                    'План на неделю'
                }
            </button>
            { showWeekPlan &&
                <div className={css.week_planner}>
                    <h3 className="third_title">Планирование недели</h3>
                    <ul className={css.week_days}>
                        {daysWeek.map((d,i) => {

                            return (
                                <li className={css.week_days__day} key={i}>
                                    <h3>{d.day}</h3>

                                    <Droppable direction="horizontal" droppableId={d.day}>
                                        {provided => (
                                        <ul className={css.week_days__day_books} ref={provided.innerRef} {...provided.droppableProps}>
                                            { d.dayBooks.map( (b, ii) =>
                                                <PlannerBook {...b} key={uuidv4()} index={ii} day={d.day} removePlannedBook={removePlannedBook}/>
                                                )
                                            }
                                            {provided.placeholder}
                                        </ul>
                                        )}
                                    </Droppable>
                                </li>
                            )}
                        )}
                    </ul>
                </div>
            }

                <div>
                <Droppable direction="horizontal" droppableId={columnId}>
                    {provided => (
                        <ul className={css.books__list} ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            bookProps.map((b, index) => {
                                return (
                                    <Book {...b} key={b.id} index={index} />
                                )
                            })
                        }
                        {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default WeekPlanner;
