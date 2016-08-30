package com.j1.ec.tracker.util;

import java.util.Random;

/**
 * 获取主键ID，使用时间+计数器+随机数方式实现
 * @author weiyuan
 */
public class ID
{
	public static ID instance = null;

	private static final long ONE_STEP = 1000;

	private static short count = 0;

	/**
	 * 获取单例对象
	 * @return
	 */
	public synchronized static ID getInstanse()
	{
		if (instance == null)
		{
			instance = new ID();
		}
		return instance;
	}

	private ID()
	{

	}

	/**
	 * <pre>
	 * 生成16位id: 当前时间13位毫秒数+3位递增数 
	 * 生成18位id: 当前时间13位毫秒数+3位递增数+2位随机数 
	 * 生成19位id: 当前时间13位毫秒数+3位递增数+3位随机数
	 * </pre>
	 * @param clazz
	 * @return
	 */
	public synchronized Long getID(int idLength)
	{
		if (count == ONE_STEP)
		{
			boolean done = false;
			while (!done)
			{
				count = 0;
				done = true;
			}
		}
		if (idLength == 16)
		{
			return Long.parseLong(System.currentTimeMillis() + padLeft(String.valueOf((count++)), 3, '0'));
		}
		else if (idLength == 18)
		{
			return Long.parseLong(System.currentTimeMillis() + padLeft(String.valueOf((count++)), 3, '0')
					+ getRandom(2));
		}
		else if (idLength == 19)
		{
			return Long.parseLong(System.currentTimeMillis() + padLeft(String.valueOf((count++)), 3, '0')
					+ getRandom(3));
		}
		else
		{
			return Long.parseLong(System.currentTimeMillis() + padLeft(String.valueOf((count++)), 3, '0')
					+ getRandom(2));
		}
	}

	/**
	 * 生成指定位数的随机数
	 * @param paramInt
	 * @return
	 */
	private static String getRandom(int paramInt)
	{
		Random localRandom = new Random();
		String str = "";
		for (int i = 0; i < paramInt; i++)
		{
			str = str + localRandom.nextInt(9);
		}
		return str;
	}

	/**
	 * <pre>
	 * 格式化数字,左边不足位数补给定数字
	 * </pre>
	 * @param paramString
	 * @param paramInt
	 * @param paramChar
	 * @return
	 */
	private static String padLeft(String paramString, int paramInt, char paramChar)
	{
		while (paramInt > paramString.length())
		{
			paramString = paramChar + paramString;
		}
		return paramString.substring(0, paramInt);
	}

	public static void main(String[] args) throws Exception
	{
		ID id = ID.getInstanse();
		for (int i = 0; i < 1010; i++)
		{
			System.out.println(id.getID(19));
		}
	}
}