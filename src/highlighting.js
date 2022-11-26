export default function highlighting (s) {
    let answer = s;
    const re = new RegExp("(\\\\[A-z]+{)(.+)(})", "g");
    for ( const [before, s1, s2, s3] of s.matchAll(re)){
        
        const after = `<span class="hl-kw1">${s1}<span class="hl-kw2">${s2}</span>${s3}</span>`
        answer = answer.replace(before, after)
    }

    const re2 = new RegExp(`\\\\[A-z]+[ \n]`, "g");

    for( const [before] of  answer.matchAll(re2)){
        console.log(before);
        const after = `<span class="hl-kw1">${before}</span>`
        answer = answer.replaceAll(before, after)
    }
    

    return answer;
}