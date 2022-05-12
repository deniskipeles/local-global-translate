import { useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'



const AutoComplete = ({ suggestions, setInput, input }) => {
  const router = useRouter();
  const route=router.asPath
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [input, setInput] = useState("");
  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };
  
  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };
  const urlLanguage = "/translate/add-language"
  const urlWord = "/translate/add"
  
  
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions. {(route == urlWord) ? 
        
        <Link href={{ pathname: urlLanguage, query: { back: true } }}>
        <a>Please add language</a>
        </Link>
        : null}</em>
      </div>
    );
  };
  
  
   return (
    <>
      <input
        //class="form-control"
        type="text"
        onChange={onChange}
        onKeyDown={()=>{}}
        value={input}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoComplete;




