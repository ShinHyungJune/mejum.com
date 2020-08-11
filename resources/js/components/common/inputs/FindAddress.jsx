import React, {Component, useState} from 'react';
import Pop from '../../common/Pop';

const FindAddress = ({setForm, form, name}) => {
	let [word, setWord] = useState("");
	
	let [items, setItems] = useState([]);
	
	const changeForm = (e) => {
		setWord(e.target.value);
	};
	
	const search = (e) => {
		e.preventDefault();
		
		axios.get(`/api/search?word=${word}`)
			.then(response => {
				if(response.data.items)
					return setItems(response.data.items.map(item => {
						item.title = item.title.replace(/<[^>]+>/g, '');
						
						return item;
					}));
				
				return setItems([]);
			})
	};
	
	const choice = (item) => {
		setForm({
			...form,
			[name]: item.roadAddress
		});
		
		window.setPop("");
	};
	
	const register = () => {
		if(word.length === 0)
			return window.setFlash("적어도 1글자 이상 입력해주세요.");
		
		setForm({
			...form,
			[name]: word
		});
		
		window.setPop("");
	};
	
	return (
		<Pop name={"주소 찾기"}>
			<div className="input--wrap input--findAddress">
				<div className="input--text">
					<input type="text" name={"word"} onChange={changeForm}/>
				</div>
				
				<button className={"white bg--primary"} onClick={search}>
					<img src="/img/search--white.png" alt=""/>
				</button>
			</div>
			
			<div className="addresses scroll--smooth">
				{items.length === 0 ?
					<div className="addresses__empty">검색된 음식점이 없습니다. <button className="addresses__btn" onClick={register}>입력한 주소로 직접 등록하기</button></div>
					: null
				}

				{items.map((item, index) =>
					<div className="address" key={index} onClick={() => choice(item)}>
						<p className="address__title">{item.title}</p>
						<p className="address__address">{item.roadAddress}</p>
					</div>
				)}
			</div>
			
			<div className="pop__buttons">
				<button type="button" className="button--middle bg--lightGray" onClick={() => window.setPop("")}>취소
				</button>
			</div>
		</Pop>
	);
};

export default FindAddress;
