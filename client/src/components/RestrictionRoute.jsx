import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin, getUserType } from '../utils/utils';

// memo 지우: 비로그인 상태일 때만 페이지 이동
const NonMemberRoute = ({ children }) => {
	if (isLogin()) {
		return <Navigate to="/notfound" />;
	} else {
		return children;
	}
};

// memo 지우: 일반 로그인 상태일 때만 페이지 이동
// 농장주일 때 -> 알림창 띄움
// 비로그인일 때 -> 로그인 페이지로 이동
const MemberRoute = ({ children }) => {
	if (isLogin()) {
		if (getUserType() === 'member') return children;
		else {
			return <Navigate to="/notfound" />;
		}
	} else {
		return <Navigate to="/login" />;
	}
};

// memo 지우: 농장주 로그인 상태일 때만 페이지 이동
// 일반 회원일 때 -> 알림창 띄움
// 비로그인일 때 -> 로그인 페이지로 이동
const FarmerRoute = ({ children }) => {
	if (isLogin()) {
		if (getUserType() === 'farmer') return children;
		else {
			return <Navigate to="/notfound" />;
		}
	} else {
		return <Navigate to="/login" />;
	}
};

export { NonMemberRoute, MemberRoute, FarmerRoute };
