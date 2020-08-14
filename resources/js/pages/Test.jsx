import React, {Fragment} from 'react';
import Form from '../components/common/Form';

const Test = () => {
	return (
		<div>
			<Form method={"post"} url={"/api/test"}>
				<input type="cropImage" name={"img"} data-aspect={1/1}/>
				
				<button>제출</button>
			</Form>
		</div>
	);
};

export default Test;