import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Styles
import '../Controls.scss';

// Imports
import Chevron from '../../../UI/Indicators/Chevron/Chevron';

/**
 * Component containing the word controls.
 * @function WordControls
 * @param {object}  props - React props.
 * @prop {function} props.addCustomWordHandler - Function allowing client to add a custom word.
 * @prop {object}   props.customWordError - Error to be displayed if one exists.
 * @prop {array}    props.customWords - Client entered custom words.
 * @prop {function} props.removeCustomWord - Function allowing client to remove a custom word.
 * @prop {function} props.selectWordBundle - Function that allows clients to select a word bundle for play.
 * @prop {function} props.useCustomWords - Function that emits a socket event to use the currently entered custom words for play.
 * @prop {string}   props.wordBundle - The currently selected word bundle.
 * @prop {array}    props.wordBundles - The currently selectable word bundles as strings.
 * @returns {JSX}
 */
const WordControls = (props) => {
    const [timeOpened, setTimeOpened] = useState(0);
    const changeToAuto = useRef();

    const tabHandler = (evt) => {
        const clickedTab = evt.target.parentElement;
        const isCollapsed = clickedTab.getAttribute('data-collapsed') === 'false';

        isCollapsed === true ? collapseTab(clickedTab) : expandTab(clickedTab);
    };

    const collapseTab = (elem) => {
        const content = elem.childNodes[1];
        content.style.height = content.scrollHeight + 'px';

        if (Date.now() - 310 < timeOpened) {
            clearTimeout(changeToAuto.current);
        }

        setTimeout(() => {
            content.style.height = '0px';
        }, 10);

        elem.setAttribute('data-collapsed', 'true');
    };

    const expandTab = (elem) => {
        const content = elem.childNodes[1];
        content.style.height = content.scrollHeight + 'px';

        setTimeOpened(Date.now());

        changeToAuto.current = setTimeout(() => {
            content.style.height = 'auto';
        }, 310);

        elem.setAttribute('data-collapsed', 'false');
    };

    return (
        <div id='word-bundles' className='game__controls__tab' data-collapsed='true'>
            <div className='game__controls__tab__title' onClick={(evt) => tabHandler(evt)}>
                <h3>Words</h3>
                <Chevron />
            </div>
            <div className='game__controls__tab__content-container'>
                <div className='game__controls__tab__content'>
                    <div className='game__controls__tab__content__col'>
                        {props.wordBundles.map((bundle, i) => {
                            if (i % 2 === 0) {
                                return (
                                    <button
                                        key={bundle}
                                        id={bundle}
                                        role='checkbox'
                                        aria-checked={props.wordBundle === bundle ? 'true' : 'false'}
                                        className='create-game__option__selection__brick'
                                        onClick={() => props.selectWordBundle(bundle, props.wordBundle)}
                                    >
                                        {bundle}
                                    </button>
                                );
                            }
                        })}
                    </div>
                    <div className='game__controls__tab__content__col'>
                        {props.wordBundles.map((bundle, i) => {
                            if (i % 2 === 1) {
                                return (
                                    <button
                                        key={bundle}
                                        id={bundle}
                                        role='checkbox'
                                        aria-checked={props.wordBundle === bundle ? 'true' : 'false'}
                                        className='create-game__option__selection__brick'
                                        onClick={() => props.selectWordBundle(bundle, props.wordBundle)}
                                    >
                                        {bundle}
                                    </button>
                                );
                            }
                        })}
                    </div>
                    <div className='game__controls__tab__content__custom'>
                        <div className='game__controls__tab__content__custom__info'>
                            <h3>OR</h3>
                            <h3>Enter Custom Words...</h3>
                            <p>
                                To play using custom words you must enter 25 unique words one at a time by typing each
                                one in the box below and then pressing your enter key to submit it. Once there is 25
                                words entered the &apos;play custom&apos; button will be active.
                            </p>
                            <input
                                id='text-input'
                                onKeyPress={(evt) => {
                                    if (evt.key === 'Enter') {
                                        props.addCustomWordHandler(evt);
                                    }
                                }}
                                maxLength={40}
                            />
                            {props.customWordError}
                            <p>{props.customWords.length} / 25</p>
                        </div>
                        <div className='game__controls__tab__content__custom__bricks'>
                            {props.customWords.map((word) => {
                                return (
                                    <button
                                        key={word}
                                        onClick={() => {
                                            props.removeCustomWord(word);
                                        }}
                                    >
                                        <p>{word}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <button
                        onClick={() => props.useCustomWords(props.customWords)}
                        className={
                            'game__controls__tab__content__submit-btn' +
                            (props.customWords.length !== 25 ? ' disable' : '')
                        }
                    >
                        Play Custom
                    </button>
                </div>
            </div>
        </div>
    );
};

WordControls.propTypes = {
    addCustomWordHandler: PropTypes.func,
    customWordError: PropTypes.object,
    customWords: PropTypes.arrayOf(PropTypes.string),
    removeCustomWord: PropTypes.func,
    selectWordBundle: PropTypes.func,
    useCustomWords: PropTypes.func,
    wordBundle: PropTypes.string,
    wordBundles: PropTypes.arrayOf(PropTypes.string),
};

WordControls.defaultProps = {};

export default React.memo(WordControls);
