<template>
<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<input 					
					class="inputd"
					v-model="phoneData"
					type="text"
					maxlength="20"
					placeholder="邮箱"
					:focus="isFocus" 
				/>
				<input
					class="inputd"
					v-model="passData"
					type="password"
					maxlength="20"
					placeholder="密码"
				/>
			</view>
			<button 
				class="wbutton"
				:rotate="isRotate" 
				@click="startLogin"
			>登录</button>
			<text style="font-size: 24rpx;margin: 35rpx auto auto auto;" @click="templogin()">游客登录</text>
			
			<!-- 底部信息 -->
			<view class="footer">
				<br />
				<navigator url="/pages/forget/forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="/pages/register/register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAMgAyAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP3UooooAKKKKACiiigAor5n/bp/auvPh6//AAh/hq6Nvq08QfULyJ8SWSMMrGn92RlIbdwVUgjlgR4X+yT8fdY+H3xo0uO41K6uNK1y5Szvop52aM+YwUS85wysQd3XG4dCa+0wPBOMxOXvH3UdG4xtrJL8r9N7+SPz3MvEXAYTNY5ZyuWqjKSekW9LW62+1tbzasfoZRTZ7iO1geSV1jjjUs7sdqqB1JPYV498S/26fh/8PC0MOpN4gvFXIi0sCaPPbMuRH/3ySR6dM/MYLLsVi58mGpuT8l+b2XzPsswzbB4CHtMZVjBebtf0W7+R7HRXxb4t/wCCm/iK/DLonh3SdNVsgPdSvdOOOoxsGe/II+tef6j+3L8UNRlkP/CTG3SRiRHDY26iMHsD5e7A9yT719dh/DvNaivU5Yeru/8AyVNfifCYvxWySk7Uuep5qNl/5M4v8D9EqK/Ndf2tPiQtwJP+Ev1bcDnBdSv/AHzjH6VqaZ+3D8UNMlVv+Ema4VTkpNZW7hvYnZn8iK65eGuYJe7Ug/8AwJf+2nFT8X8rb9+jUXyi/wD25H6KUV8WeFf+Cm3iSxdV1jw/o+oxjAJtne1kPPXJLjp7Cvb/AIY/t1eAfiIUhnvpPD96zBRFqQEaMT6SAlMf7xU+1fP4/g/NcIuedJyXePvfgtfwPqMs49yTHSUKdZRk+kvd/F6fcz2SimwTpdQJJG6yRyKGR1OVYHkEHuDTq+ZPsN9UFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFZvi/wATW/gvwpqWr3bBbbTLaS6kycZCKWx9TjH41pV47+3h4lbw7+zTrSIzJJqUsFmrA44aRWYfiiMPxruyvCfWsZSw/wDNJL5N6/gebnGO+p4Cti/5IykvVJtfifBPjTxbeePPF2pa1ftvvNUuXuZTk4BYk4GeijoB2AAqnpOpSaPqtreRf6y1lSZPqpBH8qr0V/T8acYw9mlpa1vI/jWVacpurJ+83e/nvc774yftL+LvjjcMusak0en7spp9rmK1TnIyufnI7FyxHYiuBoorLDYWjh6apUIqMV0SsjbGY2viqrr4mbnJ7tu7Ciiiug5QooooAKKKKAPQPg9+034w+CU6LpGpNLp4bL6fdZltm9cLnKE+qEGvtr4A/taeGfj1Alvbyf2VrvO7TbmQeY+BktG3SRcZ6YYbSSAOT+ctTadqNxo9/DdWs0tvc27iSKWNirxsDkEEdCK+Vz7hHBZlFztyVP5kt/8AEuv5+Z9twzx1mGUSUL+0pdYN7L+6/s/l3R+s1FfOf7H/AO2hF8TfsvhjxNIsHiBVK212SFj1ADGFPORLjt0bB78H6Mr8LzTK8Rl+IeHxKs19zXdeR/SmS51hc0wqxeEleL3XVPqmujX/AAVoFFFFeaesFFFFABRRRQAUUUUAFFFFABXy3/wUt+Jumr4R0nwjHJ5urSXiajMi8i3iVJEG7nhmL5A54U5xkZ+hPin8RbH4TfD/AFTxBqGWt9NhL+WDhpnPCID6sxA9s1+ZPjnxpqHxF8X6hrmqSCa/1KYzSsBhQT0VR2VQAAOwAr9C8P8AI5YnFfXp/BTennL/AIC1fyPyvxQ4kjhMF/ZtPWdVa+Ub7+rei+fkZNFFFftx/OYUUUUAFFFFABRRRQAUUVLZ2U2o3Cw28Ms80hAVI0LMxPAAA96L21YJNuyIqK7bTv2b/H2q28csPg7xEY5PulrGRMj1+YDj36VFr37Pfjrwxb+dfeEvEEMKgs0gsndEH+0yghfxxXGsxwrlyKrG/bmV/wAzveVY1R53Rnbvyu332ORtrmSzuI5oZHimiYOjoxVkYcggjoQe9ff37GP7TA+OfhCTTdTZV8SaLGon+b/j9i6CYDrnPDdcEg/xAD8/q6H4V/ErUfhF480/xBpbAXNjJuKMfknQ8PG3+yykj26jkCvI4myGGaYR0/8Al5HWL8+3o9n9/Q93g7iepkuOVXX2UtJruu681uvu6n6jXt9DplnJcXM0VvbwqXklkcIkajqSTwB7mvJPGf7dfw38HXUtuusTatPCSGXTrdplzx0kOI269VYjg18V/Gn9oXxN8dtY+0a1en7JGxNvYw/Jb2w9l/iP+02T74wBw9fIZX4bUlBTzCo3LtHRL5u9/kkfeZ14uVnNwyuklH+aerfok0l82/kfeOgf8FG/h7rWorBcR+INLjYgefdWiGNfr5cjt+le36Br9l4p0a31DTbqG9sbxBJDPC25JFPcH/OK/J+v0a/Y0+H+p/Db4AaRY6sskV5O0l35Dnm2WRtyoR2OOSOxYjrmvH4y4WwGW4eNfDSak3blbvdW1a66demp73h/xpmeb4ueGxcU4xjfmStZ3SSfTXW3XQ9Sooor85P1oKKKKACiiigD47/4KWfFl7vXdJ8G2sn7izQahfBT96VsrGp/3V3NjofMX0r5Xrqfjb49f4n/ABa8Qa8zF01C8doSe0K/JEPwjVR+FctX9L8P5asDl9LD21Su/wDE9X+P4H8f8U5s8yzSti73TbUf8K0j+Gvq2FFFFeyfPhRRRQAUUUUAFOijaaRURWZ2IVVUZJJ7Cm19T/sMfCzwj4bhg8X+KdY0CPVpn/4lNlc30StbAcecULZ8wn7oI+UYPUjHl5xmkMvwzxEk5Polu32/zfRHtZDktTNMZHCwkordyeyXV+b6JdX94v7Pv/BO2bWrSHVfHUtxYwyKskWl277ZiOv75sHZx/Cvzc8lSCK+qfA3w30H4aaStjoOlWel26jBEMeGf3Zj8zH3Yk1swXEd1CskbrJGwyrKdyn6GnV/P+ccQY7MZt4mb5f5VpFfL9Xdn9RZDwrluU00sJBc1tZvWT+fT0VkFFFFeGfSHFfEr9nfwZ8Ww7a5oNlcXTjH2uJfJuR6fvEwxx6Eke1fCP7VPwSsfgH8Uf7E07ULjULWW0S7U3CBZIdzOuxiMBj8oO4Afexjjn9I6+Cf+Cilg9n+0XJIysq3em28qE/xAbkyPxQj8K/SPDzMcTLHPCyqNw5W+Vu6urbX2+R+R+KuU4OOWrGQpJVOdLmSs7NO97b7dbnhNeofDX9jrx98UrKzvbHR1tNMvlDx3t7OsMZQ8h9uTIVPUFUOa8vr9DP2E/EL6/8As0aGsjbpLB57Qn2WVio69lZR26V99xdnOJyzBLEYZJtySd7u109dGux+YcCcP4TOMwlhcY5JKLkuVpXaaVndPv0Mn9n39hPw/wDCC/t9W1af/hIdcgIeJnj2Wto2OqJk7mBzhmPoQqkZr3aiivwfMMzxWOq+2xU3KX5eSWy+R/TOVZPg8tofV8FTUI+W7fdt6t+oUUUVwnpBRRRQAVyfx58QP4W+CnizUI2aOa30q5MTDqshjYIfwYiusryz9ta8+w/sweK3zt3RQx/99XES/wBa9DKaSq46jTf2pxX3tI8vPKzo5diK0d4wm/ui2fnNRRRX9QH8ZhRRRQAUUUUAFFFFABRRXbfC39nbxh8YbqFdF0W7e0mbBvp0MVogBGSZCMHGei5b0BrHEYilQg6laSjFdW7I6MLhK+JqKlh4OUn0Sbf4G1+yd8TvEngn4xaDY6Nc3klrql/Db3VijForiNm2sSvQFVLHdxjGc4zX6OV47+zH+x/pPwAjOo3My6v4kmj2NdGPbHagj5khB5Gehc8kdlBIr2KvwTjPOMLmGNU8ItIqzla3N/wF0vqf054fZDjsry908dLWTuo3vyLt2u93bT53CiiivkD7wK+U/wDgpn8MpLzTdC8XW8Jb7Hu069cDO1GO+In0AYyDPq4r6srN8X+E7Dx34YvtH1S3W60/UYWgmjbupHUHsw6gjkEAjkV7GQ5o8ux1PF7pPVd09H/wPM8HibJVmuW1cE3ZyWj7STuvx0flc/KWv0K/YO0KTRP2Z9FaRdrX0s91j2MrKv5qoP415N/w7Cm/4TX/AJGeL/hHfM3E+QftuzP3Mfc3Y439M87P4a+sdF0e18O6PaafZQrb2djClvBEv3Y40AVVH0AAr7jjjibB43CU8Ng5c13zPRq1k7LXq7/gfm/hvwfmGXY6ri8fDktHlSundtpt6N6JL53LVFFFfl5+zBRRRQAUUUUAFcL+0x4Wk8Z/APxXp8KeZNJp8ksaf32jxIoHuSgx713VB5rowuIdCtCvHeLT+53OXG4WOJw9TDz2nFxfo1Y/JOivRP2ofgxN8D/i5f6Ztzp10Teae4GAYHY4X6oQVPrtzgZFed1/UGFxVPEUY16TvGSuvmfxnjsHVwmInhq6tKDaa80e0/sG/BXSfjf8c/seuRi503SbGTUZLYnC3RV40VGwQdu6QMfXbg8Gvuj4l/steB/id4Mm0a48PaVYqY2W2uLK1SCazfBwyFQOhOdp+U9wa/Nb4OfF7WPgd4+s/EWhyRreWoZGjlBaK4jbho3AIyp+oIIBGCAa98+JX/BUTxB4w8E3Ol6R4ft/D99eRGGS/W9M7xg8MY12LtYjoSWx1HOCPgeKMjznF5jTrYKdoJK3vW5XfV26/K76H6hwZxJkGCymrh8xgnUbd1y83OraJO2nazaS36s+YL21axvZoGZGaF2Qsh3KxBxkHuKioor9GXmfkr30CiitXwP4Nv8A4h+LtP0TS4vOvtSnWCJTnaCerNgHCqMknsATU1KkYRc5uyWrfkXTpyqTVOCu27Jd29kfXv8AwT4+Cekz/CSTxFq2jabfXupX0hs57iBJmjgjwny7gdp8xZOnXAr6arH+H/gu1+HPgjS9CsdzWulWyWyM33pNowWOOMsck47k1sV/M+eZlLHY2piG3Zt2v0XT8LH9g8OZPDLcvpYVJKUYrma6y6vz1vbyCiiivJPcCivPfjn+0x4X+Adh/wATa6a41OVN8Gm22GuJRnAYjoi9fmYjO043EYr5H+J/7f8A468c3Mselzw+GdPbhYbQB5sf7UzDdn3QJ9K+nybhHMMyj7SnHlh/NLRP06v7reZ8bxBx1lWUy9lWk51P5Y6terukvRu/kffVFflTrvjzXPFE/m6nrWrajJnO+6u5JmzjHViewA/CnaN8Q9f8O3guNP1vVrKdf+WkF3JG35g19Z/xDGpy3+sK/wDh0+/m/Q+H/wCIyUee31V2786v93L+p+qlFfAfwv8A2+/HXgKVY9SuIvE1j3ivflmXnJ2yqN2f97cPavrj4HftPeFvj1asul3LWupRKDNp91hJ145K84deDypOOMgZFfKZzwjmGXJ1KkeaH80dUvXqvnp5n3HD/HWVZtJUqUuSp/LLRv03T+Tv5HolFFFfLn2QUUUUAFFFFABRRRQB57+0l+z/AKf+0F4DewnEcGq2YaXTbwjm3kI5BPXY2AGHsD1UV+d/xC+HurfC7xZdaLrVq1pfWrYIP3ZF7Op/iU9Qf65FfqlXI/F34HeG/jdon2PXtPSZowRBdR4S5tSf7j4yO2QcqcDINfccKcYTyz/Z8QnKk/vj5ry7r5rz/OeNuA6ecf7VhWo10uu0kuj8+z+T0tb8waK+hvit/wAE6vFnhOea48NzW/iTTxllj3CC7Qc8FWO1sDHKtkn+EdK8X8QfC3xN4TnEeqeH9a092JCi4spI9+PQkcj3FfsuBzrA4yPNhqql5X1+aeq+4/n3MuH8ywE3DF0ZR87XXya0fyZg0Vo6f4R1bVr37Na6XqN1cYz5UVs7v2HQDPcfmK9N+G37D/xA+IdzH5uktoFm3LXGqZgKj2jwZCeP7oHTkZzW2KzLC4aPPiKkYrza/pnPgcpxuMn7PC0pTfkm/vey+Z5LaWkt/dRwQRyTTTOI4441LNIxOAABySTxgV90fsU/sot8H9LbxF4gt1/4Sa+QrFExDf2dCcce0jc7iCcDC8fNnpv2ff2PPDXwIMV9tOseIFTBv7hABCTkHyU58vIOM5LYyM4JFetV+RcWcbLGQeDwN1Te8tnLyXZeur8lv+7cD+Hby+osfmVnVXwxWqj5t9ZdraLe7exRRRX5yfrQV5P+1j+0tbfs/wDgvbatDceJNSG2xtm+byx3mcZ+4uMD+82B0DEep317FptlNcXEixwW6NJI56IoGST9AK/Mr4+fFu5+NnxS1PXpi4gmfyrOJv8AlhbqSI1+uOT/ALTMe9fZcF8PxzLFudZfu6dm/N9F/n5LzPz/AMQuKJZRgVDDu1WpdRfZLeXqrpLzd+hzfibxNqHjLXrrVNUu5r7UL1/Mmnlbcznp+QGAAOAAAMAVRoor98jFRSjFWSP5hnOU5OUndvVt9Qoor6q+Af8AwTRuPiJ4Ctdc8Sa5No51SET2lnb2++WNGGVaQtjBPB2gdCOQeB5+aZxhMvpqri5cqbst236JHrZNkOOzWs6GBhzNK71SSXm3ZHyrVzQdevfC+s2+oaddTWV9ZuJIZ4WKvGw7g13X7TH7N+q/s1eN49Lvp476zvYvPsryNCqzoDhgQfuspxkZPBBzzXnNdOHxFHFUFVpNShJadmv63Rx4rC4jBYiVCunCpB6rqn8vvTXqj9BP2P8A9qSP48eGP7P1R44/FOmx5uVVNi3cecCZQOAegZR0PIABAHtFfln8LfiJffCjx/pfiDT2/wBI02YPtP3ZUPDofZlJH41+nnhTxJb+MfC+nataHda6nbR3UWeu11DDPvzX4fxtw7DLsSq2HVqdS9l2fVenVfNdD+jvDniqea4R4fFO9Wla7/mj0b8+j+T6mhRRRXxB+jBRRRQAUUUUAFFFNllWCJndlREBZmY4CgdSTQA6ivkrxr/wUyksPHLQ6HoFreaBaymNpp5mWe8UHG9MDEYPYMGOMZweB9K/DD4m6T8XvBlrrmizmazusgqwxJA4+8jjJww9PcEZBBPtZlw7j8BSjXxVPljL0dn2dtn6nzuU8VZZmdeeHwdXmlDdWauu6vuvNfk0dBRRRXin0QUUUUAFFeb/ALRP7TOifs8aHHJeK2oateAm006KQK8oH8bHnYmeN2CSegODj4p+L/7Xfjb4x+bBeakdO0uQ/wDHhYZhhIxjDHO989SGYjPQCvrMh4PxuZx9rG0Kf8z6+i6/gvM+H4m4+y7J5OhK9Sr/ACx6f4nsvxfkfWf7Z3xu0fwr8E/EWl2et6c2vX0a2K2cV0jXCq7BZCyA7lHl7xkjrgd6/P6iiv2bh3IaeU4d0KcuZt3bat0S+7Q/n7irietnmKWJqRUFFcqSd+rd793fstkFFFFe8fMBX6Mfs2ftreBfE3wq0i31bXNP8P6vpdpHa3VvfSiFWaNAu9GICsrbc4HIzgjpn856K8HP+H8Pm1KNOs3Fxd01+O59NwvxVisjryq4dKSkrNPy2enVfqfQH/BQX9onR/jp8QNLtfD8wvNK8PQyxi7ClVuJZGXftyASoEagHoeSOOT8/wBFFehluX0sDhoYWj8MV137t/N6nl5vmlbMsZUxuItzTd3bZaWSXokkFff/APwT78Sya/8As4WUMh3f2TeT2anH8O4SD8vMx+FfAFfc3/BNO3aH4C6kzdJtcmZfp5EA/mDXyfiJCMspu+ko2/Ffkz7jwpqSjnnLHZwkn+D/ADSPoaiiivwk/pYKKKKACiiigArgf2pddk8Ofs8+LrqJmST+zpIAynBHmYj4/wC+/wD9XWu+rif2kfDcni34DeLLGFPMmk02WSNMZ3sg3qB7kqAPeu7K3BY2i6m3NG/pdXPNzpTeX11S+Lklb15XY/Mmvpf/AIJr/E2TRviHqXheeZvsutW5ubeM5IFxFycdhuj3Env5a+gr5or0z9ji8ex/aZ8JSISGa6ePg9midT+hNf0PxJhY4jLK9Of8ra9Urr8UfynwjjZ4XOcNVh/PFP0k+V/g2fpBRRRX81H9fBRRRQB8I/8ABQD4a+JNO+NGoeIrq1urjQb6OEWt2iFobcKioYnOMI28MQD13ZGTnHgNfrW6LIhVlDK3BBHBr5m/bf8AiZ4P+GWh3GjaZofh248YapHteb+z4Wk0+JhzIzbciRgflHXnd2G79c4V4yrVVSy1UOaSSV07Ky0u1bSy3d/kfhPG3AFCjKtm7xPLGTcmpK75nraLvrd7K2nV2Vz4tooor9UPxUKKKKACiiigAooooAK/RD9hjw63h79mbw/5kTQzXxnu3Ddw8r7D+MYQ/jX57aXplxrWp29naxNPdXcqwwxr96R2ICqPckgV+qnhDw3D4O8J6XpFtn7PpdpFZxE9SsaBB+gr808S8Yo4SlhlvKTfyirf+3fgfsHg/gXPHV8Y9oRUfnJ3/KP4mjRRRX40f0AFFFFABRRXH/H7xrffDr4M+Ita01N9/p9mzwfJv2MSF3kdwud3PHy88Vth6Eq1WNGG8mkvVuxz4rEww9CeIqfDBOT9Ers5P9oP9sfw18B5X0/Da14gUA/YLeQKIM8jzZMEJkc4wW5BwAQa+U/iD+3b8QvHLzxw6lDodlMCvkWEIUhT/wBNGy+fcMPoK8gvb2bUrya4uJpbi4uHMkssjFnkYnJZieSSTkk9air9+yfg3LsDBOcFUn1lJX18lsvLr5n8wZ/4gZrmVRqE3Sp9IxdtPNrV+fTyCuw+AvxLt/g/8W9H8SXVk2oW+mvIXgRgrNviePIJBGV3bh646jqK/wAKPg34g+NHiNNN0GxkuHyPNnbK29qv96R8YUe3U9ACeKt/HP4Iat8BPGraNqhjm3xLNb3MQPlXKHqVzzwcgj1HoRXuYjEYStOWX1JLmlF3jfXlej9N/Xqtj5rC4XHYenHNaUGoQkrStpzJ3W+j1Xp0e597/DD9qTwP8WkhTTNbt4b2YZ+xXhEFwD6bWOGP+6Wr0KvyTrq/DHx08ZeDLVYNL8Ua5Z26/dhS8fyl+iE7R+Ar87x/hnFy5sHWsu0lf8V/kfrGWeME1HlzChd94O3/AJK/8/kfqDWf4p8W6X4I0aTUNY1Cz02xh+9NcyiNAewyepPYDk1+bd7+0x8Qr+Nlk8ZeIlD4z5d68Z/AqRj8K5DVdYvNdvGuL66uby4YYMs8rSOfxJJrlw3hlVcv9orpL+6m397tb7mdeM8YqKhbC4dt/wB6SSXySd/vXqfW3x7/AOCjNrDZSaf4BjkmuJMq2q3UG2OIY4MUbcs3J5kAAx91s8fJOsaxdeINVuL6+uJru8u5DLNNKxZ5WJySSepNVqK/RsnyLB5bT9nhY6vdvVv1f6Ky8j8mz7iXH5xV9rjJ3S2itIr0X6u78wooor2DwQooooAKKKKACiiprCwm1W/htbaGS4uLmRYooo13NI7HAUDuSSBihu2rGk27I9y/4J+/CU+PfjMutXVv5mm+GU+1bmUFGuTxEvPcHdICOhjFfelef/szfBeP4FfCWw0dvLbUZf8AStQkXo87gbgD3CgBAe4XPGa9Ar+deLM4WY5hKpB+5H3Y+i6/N3fpY/q/gfh95TlUKNRfvJe9Lyb6fJWXrcKKKK+ZPsAooooAKjurWO+tpIZo45oZlKOjruV1PBBB6g1JRQm07oGk1Znhni3/AIJ5/DvxNqLXFvHrGi72LNFYXS+WSfQSI+B7DAFT+Ev+Cf8A8OfC9wss1jqGtOhyv2+7JXPHVYwinp0II5Ptj2yivcfEmauHs/rE7erv9+/4nzq4RyVVParCwv8A4Vb7tvwKeheH7DwvpcdjpljZ6dZw58uC2hWGJMnJwqgAZPNcJ+05+z7a/tCfD5tP8yK11ayYz6ddOuRG+MFGxzsccHHQhTg7QD6PRXm4XHV8PiI4qlK00738/Pvfr3PUxmXYfFYWWDrRTpyVmttPLtbpbY/KDxF4dvvCWu3Wmalay2d9YyGKeGQYaNh2/wDrjgjkcVSr9CP2rf2TrH4+6P8AbrHybHxRZx4guGGEulH/ACylI7ejclfpkV8E+LfCOpeA/EV1pOsWc2n6jZOY5oZR8yn1B6MpHIYEggggkEGv6D4d4koZrQ5o6VF8Ue3mu68/kz+WeLOEsVkmI5Z3lSk/dl0fk+0l267ozaKKK+jPkwooooAKKKKACiiigAooooAK+lv+Ca3w303xR441zXryNprvw6kC2anBjR5vNBcjH3gI8Dnjce+CPmmvtj/gmV4cFl8K9e1RldZNQ1MQDK4DJFGpBB7/ADSuPwr5PjbFSo5PVcXZysvvav8Aern3Hhzg44jP6KmrqPNJ38ouz+UrM+lKKKK/ns/qgKKKKACiiigAooooAKKKKACiiigArh/jZ+z54b+POjC31q0/0uBGW0vYiVmtSR1BHDDODtbI/Hmu4orfDYqrh6irUJOMls1uc2MwdDFUXQxMFKEt01dH52/G79jbxh8GJp7j7K2t6JGSV1CzjLbV9ZI+Wj46nlR/eNeS1+th5ry/4nfsdeAfinJNPdaONOv5iWa705vs8hJ6krgoxPqyk1+o5R4kWSp5jD/t6P6r/L7j8Yz7wjvJ1cpqafyz/SWv4r1Z+cdFfU3jT/gmJqkFw7eHfEtjcwscrHqMTQsg9C6Bw312j6V5zrX7CPxO0eeRU0CO+jQZ822voCrfQM6t/wCO19zheKMpxCvCvFer5X/5NY/N8ZwXneFdqmGm/OK5l/5Lc8for0af9kn4kW8/lt4Q1Ysccqqsv5gkfrV7T/2J/ihqRGzwrcRg95bu3jx/31IDXbLOcviruvD/AMCj/mebHh/NJPljhqjf+CX+R5XRX0d4U/4JpeMNU2tq2raJpMbfwoz3Mq89wAq9M9Gr2f4c/wDBPXwJ4OWOXVFvfEl4oBJupDFAGB6rGmOPZ2cV4eO44ynDLSpzvtFX/HRfifS5b4cZ5i371L2a7zdvwV5fgfHHwq+Bvij40agYPD+lzXccbbZblv3dvAevzSHgHHOOSewNZvxI8CXXwx8c6loN7JDNdaXN5MjwkmNjgHK5AOOe4FfqRpOkWug6bDZ2Nrb2dnbrsiggjEccS+iqoAA9hXxn/wAFAPgDrEHxNk8W6Zp91faZq8UYumt4mkNtOiiP5gAcKyhMHoWyOuM+RkHHDzDMXQqpU4NPl11but36XskvvPd4n8OVleUrE0ZOpUUlzO2ijZ7LV6O12356HzTBC9zMkcaNJJIwVVUZZieAAPWv04/Z/wDhv/wqX4O6BoLRrHc2lqrXYDbv9If55ee4DswB9AK+bv2If2Q9QbxFa+MvFNjJZ2tiwm0yzuE2yTy9VmZTyqr1UEZY4PAA3fYdfPeIWfU8TUjgcO7qDvJrbm2S+Svfzduh9V4WcM1sJSnmWKjyyqK0U9+Xdv5u1vJX2aCiiivzU/XgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q==',
				phoneData:'', //用户/邮箱
				passData:'', //密码
				isRotate: false, //是否加载旋转
				isFocus: false ,// 是否聚焦
				islogin:false,
			};
		},
		mounted() {
			_this= this;
		},
		methods: {
			templogin(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			startLogin(e){
			    console.log(e)
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
			    if (this.passData.length < 5) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码不正确'
			        });
			        return;
			    }
				uni.showLoading({
					title: '登录中'
				});
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"account":this.phoneData,
						"password":this.passData,
					},
					success: (res) => {
						if(res.data == "Login Successful"){
							console.log('登录成功')
							setTimeout(function(){
								uni.hideLoading()
								uni.reLaunch({
									url:'/pages/index/index'
								})
							},1000)
							this.islogin = true;
							uni.setStorageSync('islogin',this.islogin)
							uni.setStorageSync('phoneData',this.phoneData)
						}else{
							uni.hideLoading()
							uni.showToast({
								title:'登录失败',
								icon:'error',
								duration:1000
							})
							console.log('登录失败')
						}
					},
				});
				
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},2000)
				
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
		/* margin-top: 128rpx; */
	}
	
	/* 头部 logo */
	.header {
		width:161rpx;
		height:161rpx;
		/* box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1); */
		border-radius:50%;
		/* background-color: #000000; */
		margin-top: 108rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161rpx;
		height:161rpx;
		margin-top: -50rpx;
		border-radius:50%;
	}
	
	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		border: none;
		gap: 50rpx;
	}
	.tips {
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}
	
	/* 登录按钮 */
	.wbutton{
		margin-top: 96rpx;
		background-color: rgba(90,90,90,1);
		height: 120rpx;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		border: none;
		border-radius: 90rpx;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		color: #fff;
		text-align: center;
		line-height: 120rpx;
		font-weight: 300;
		
	}
	
	.inputd{
		height: 120rpx;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		border: none;
		border-radius: 90rpx;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		text-indent: 50rpx;
		outline: none;
		font-weight: 300;
	}
	
	button::after{
		border: none;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}
	.footer text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
