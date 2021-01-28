import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../Controls.scss';

/**
 * Component containing the word bundle controls.
 * @function BundleControls
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
const BundleControls = (props) => {
    return (
        <div className='game__controls__bundles'>
            <h3>Word Bundles</h3>
            <div className='game__controls__bundles__options'>
                <div className='game__controls__bundles__options__col'>
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
                <div className='game__controls__bundles__options__col'>
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
                <div className='game__controls__bundles__options__custom'>
                    <div className='game__controls__bundles__options__custom__info'>
                        <h3>OR</h3>
                        <h3>Enter Custom Words...</h3>
                        <p>
                            To play using custom words you must enter 25 unique words one at a time by typing each one
                            in the box below and then pressing your enter key to submit it. Once there is 25 words
                            entered the &apos;play custom&apos; button will be active.
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
                        <p>{props.customWords.length} / 25</p>
                        {props.customWordError}
                    </div>
                    <div className='game__controls__bundles__options__custom__bricks'>
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
                        'game__controls__bundles__options__submit-btn' +
                        (props.customWords.length !== 25 ? ' disable' : '')
                    }
                >
                    Play Custom
                </button>
            </div>
        </div>
    );
};

BundleControls.propTypes = {
    addCustomWordHandler: PropTypes.func,
    customWordError: PropTypes.object,
    customWords: PropTypes.arrayOf(PropTypes.string),
    removeCustomWord: PropTypes.func,
    selectWordBundle: PropTypes.func,
    useCustomWords: PropTypes.func,
    wordBundle: PropTypes.string,
    wordBundles: PropTypes.arrayOf(PropTypes.string),
};

BundleControls.defaultProps = {};

export default React.memo(BundleControls);
