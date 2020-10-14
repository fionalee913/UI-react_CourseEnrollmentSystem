class SearchAndFilter {
  searchAndFilter(courses, search, subject, interest, minimumCredits, maximumCredits) {

    // check subject
    if (subject !== "All") {
      courses = courses.filter(course => 
        course.subject === subject
      );
    }

    if (interest !== "all") {
      courses = courses.filter(course => 
        course.subject.toLowerCase().includes(interest.toLowerCase()) || course.keywords.filter(keyword =>
          keyword.toLowerCase().includes(interest.toLowerCase()) 
        ).length > 0
      );
    }

    // check search
    if (search != null && search !== "") {
      courses = courses.filter(course => 
        course.keywords.filter(keyword => 
          keyword.toLowerCase().includes(search.toLowerCase())
        ).length > 0
      );
    }

    if (minimumCredits != null && minimumCredits !== "") {
      courses = courses.filter(course => 
        course.credits >= minimumCredits
      );
    }
    
    if (maximumCredits != null && maximumCredits !== "") {
      courses = courses.filter(course => 
        course.credits <= maximumCredits
      );
    }
    

    return courses;
  }
}

export default SearchAndFilter;
