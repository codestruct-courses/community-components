import MultipleChoiceQuiz from "../components/MultipleChoiceQuiz"
import Copyable from "../components/Copyable"
import FillTheGap from "../components/FillTheGap"
import Callout from "../components/Callout"
import Reveal from "../components/Reveal"
import TrueFalseDrag from "../components/TrueFalseDrag"

const AppHome = () => {

    return (
        <div className="max-w-4xl mx-auto mt-32">
            
            <MultipleChoiceQuiz question="What's the right way to import a component in React?">
                <div>This is answer number one</div>
                <div correct="true">Answer number two is slightly different and maybe a littlte longer so we can see what happens if we have line breaks in our questions</div>
                <div correct="true">The last answer is rather short...</div>
            </MultipleChoiceQuiz>

            <Copyable>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora quisquam error nemo possimus delectus repudiandae accusantium expedita laudantium debitis asperiores, tempore quam illum porro quo iure qui incidunt eos sit?
                </p>
            </Copyable>

            <Callout type="info">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse rem consectetur exercitationem suscipit dolo ribus dolor, beatae iste quam cumque voluptatem, sunt iure eos eveniet, dolorem corrupti veritatis! Dolores, ducimus corporis!
                </p>
            </Callout>

            <FillTheGap caption="Can you fill in all the gaps?">
                <p>
                    This is an example where you're asked to fill in the gap to correctly answer 5 x <span answer="5"></span> = 25. <br/>
                    Here's <span answer="another"></span> example where you have to fill in 'another'.
                </p>
            </FillTheGap>

            <Reveal caption="Click to reveal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias delectus adipisci nesciunt quos! Velit, sapiente consequuntur laboriosam sint eaque tenetur doloribus nostrum odit, nobis, sit quo aut aspernatur sunt tempora!
            </Reveal>

            <TrueFalseDrag caption="Drag the correct answers into the correct buckets" correctLabel="Correct" incorrectLabel="Incorrect">
                <div correct="true">This is a true statement — asnwers can be of any length and if there are linebreaks, it will just flow like this.</div>
                <div correct="false">This is a false statement</div>
                <div correct="true">This is another true statement</div>
                <div correct="false">This is another false statement</div>
            </TrueFalseDrag>

            
        </div>
    )
}

export default AppHome
