import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [newFontFamily, setNewFontFamily] = useState(
		currentArticleState.fontFamilyOption
	);
	const [newFontSize, setNewFontSize] = useState(
		currentArticleState.fontSizeOption
	);
	const [newFontColor, setNewFontColor] = useState(
		currentArticleState.fontColor
	);
	const [newBackgroundColor, setNewBackgroundColor] = useState(
		currentArticleState.backgroundColor
	);
	const [newContentWidth, setNewContentWidth] = useState(
		currentArticleState.contentWidth
	);
	const formOpenHandler = () => {
		setIsOpenForm(!isOpenForm);
	};

	const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentArticleState({
			fontFamilyOption: newFontFamily,
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSize,
		});
	};

	const rootRef = useRef<any>();

	useEffect(() => {
		if (!isOpenForm) return;
		const handleClick = (event: MouseEvent) => {
			if (
				isOpenForm &&
				rootRef.current &&
				!rootRef.current.contains(event.target) &&
				formOpenHandler
			) {
				formOpenHandler();
			}
		};
		window.addEventListener('mousedown', handleClick);
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpenForm]);

	const resetFormHandler = () => {
		setCurrentArticleState(defaultArticleState);
		setNewFontFamily(defaultArticleState.fontFamilyOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
		setNewFontSize(defaultArticleState.fontSizeOption);
	};

	return (
		<>
			<ArrowButton onClick={formOpenHandler} isOpen={isOpenForm} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form onSubmit={formSubmitHandler} className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={newFontFamily}
						title='шрифт'
						onChange={setNewFontFamily}
					/>

					<RadioGroup
						name={'font-size'}
						options={fontSizeOptions}
						selected={newFontSize}
						title={'размер шрифта'}
						onChange={setNewFontSize}
					/>

					<Select
						options={fontColors}
						selected={newFontColor}
						title='цвет шрифта'
						onChange={setNewFontColor}
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={newBackgroundColor}
						title='цвет фона'
						onChange={setNewBackgroundColor}
					/>

					<Select
						options={contentWidthArr}
						selected={newContentWidth}
						title='ширина контента'
						onChange={setNewContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetFormHandler} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
